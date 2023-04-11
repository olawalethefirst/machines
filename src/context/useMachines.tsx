import {useReducer} from 'react';
import {MachineCategory, Machine} from '../types';
import {
  CREATE_MACHINE_CATEGORY,
  DELETE_MACHINE_CATEGORY,
  UPDATE_MACHINE_CATEGORY_NAME,
  VALIDATE_MACHINE_CATEGORY_NAME,
  CREATE_MACHINE_ATTRIBUTE,
  DELETE_MACHINE_ATTRIBUTE,
  UPDATE_MACHINE_ATTRIBUTE_NAME,
  VALIDATE_MACHINE_ATTRIBUTE_NAME,
  UPDATE_MACHINE_ATTRIBUTE_VALUE_OPTION,
  UPDATE_MACHINE_TITLE_ATTRIBUTE,
  CREATE_MACHINE,
  DELETE_MACHINE,
  UPDATE_MACHINE_ATTRIBUTE_VALUE,
  CLEAR_CATEGORY_ERROR,
} from './actions/actionTypes';
import actions, {Action, Actions} from './actions';
import produce from 'immer';
import {
  createMachineCategoryObj,
  isNameUnique,
  createMachineCategoryAttributeObj,
  createMachineAttributeObj,
  getDefaultAttributeValue,
  createMachineObj,
  shouldDeleteCategoryAttribute,
  shouldChangeAttributeOption,
} from './utils';
import {errors} from '../constants';
import {CreateMachine} from './actions/createMachine';
import {CreateMachineAttribute} from './actions/createMachineAttribute';
import {CreateMachineCategory} from './actions/createMachineCategory';
import {DeleteMachine} from './actions/deleteMachine';
import {DeleteMachineAttribute} from './actions/deleteMachineAttribute';
import {DeleteMachineCategory} from './actions/deleteMachineCategory';
import {UpdateAttributeValue} from './actions/updateAttributeValue';
import {UpdateAttributeValueOption} from './actions/updateAttributeValueOption';
import {UpdateAttributeName} from './actions/updateAttributeName';
import {UpdateMachineCategoryName} from './actions/updateMachineCategoryName';
import {UpdateMachineTitleAttribute} from './actions/updateMachineTitleAttribute';
import {ValidateMachineAttributeName} from './actions/validateMachineAttributeName';
import {ValidateMachineCategoryName} from './actions/validateMachineCategoryName';
import {ClearCategoryError} from './actions/clearCategoryError';

export interface MachinesState {
  machineCategories: MachineCategory[];
  machines: Machine[];
}
export interface Methods {
  createMachine: CreateMachine;
  createMachineAttribute: CreateMachineAttribute;
  createMachineCategory: CreateMachineCategory;
  deleteMachine: DeleteMachine;
  deleteMachineAttribute: DeleteMachineAttribute;
  deleteMachineCategory: DeleteMachineCategory;
  updateAttributeValue: UpdateAttributeValue;
  updateAttributeValueOption: UpdateAttributeValueOption;
  updateAttributeName: UpdateAttributeName;
  updateMachineCategoryName: UpdateMachineCategoryName;
  updateMachineTitleAttribute: UpdateMachineTitleAttribute;
  validateMachineAttributeName: ValidateMachineAttributeName;
  validateMachineCategoryName: ValidateMachineCategoryName;
  clearCategoryError: ClearCategoryError;
}
export interface State extends Methods {
  state: MachinesState;
}

const initialState: MachinesState = {
  machineCategories: [],
  machines: [],
};

const reducer = (state: MachinesState, action: Action) => {
  switch (action.type) {
    case CREATE_MACHINE_CATEGORY:
      return produce(state, draft => {
        draft.machineCategories.push(createMachineCategoryObj());
      });
    case DELETE_MACHINE_CATEGORY:
      return produce(state, draft => {
        draft.machineCategories = draft.machineCategories.filter(
          machineCategory =>
            machineCategory.id !== action.payload.machineCategoryId,
        );
      });
    case UPDATE_MACHINE_CATEGORY_NAME:
      return produce(state, draft => {
        draft.machineCategories = draft.machineCategories.map(
          machineCategory => {
            if (machineCategory.id === action.payload.machineCategoryId) {
              machineCategory.name = action.payload.name;
              machineCategory.nameUnique = true;
            }
            return machineCategory;
          },
        );

        draft.machines = draft.machines.map(machine => {
          if (machine.categoryId === action.payload.machineCategoryId) {
            machine.name = action.payload.name;
          }
          return machine;
        });
      });
    case VALIDATE_MACHINE_CATEGORY_NAME:
      return produce(state, draft => {
        draft.machineCategories = draft.machineCategories.map(
          machineCategory => {
            if (machineCategory.id === action.payload.machineCategoryId) {
              const nameUnique = isNameUnique(
                machineCategory.name,
                draft.machineCategories.map(({name}) => name),
              );

              if (nameUnique) {
                machineCategory.nameUnique = true;
                machineCategory.lastUniqueName = machineCategory.name;
              } else {
                machineCategory.nameUnique = false;
                machineCategory.name = machineCategory.lastUniqueName;
              }
            }
            return machineCategory;
          },
        );
      });
    case CLEAR_CATEGORY_ERROR:
      return produce(state, draft => {
        draft.machineCategories.map(category => {
          if (category.id === action.payload.categoryId) {
            category.error = '';
          }
          return category;
        });
      });
    case CREATE_MACHINE_ATTRIBUTE:
      return produce(state, draft => {
        const newAttribute = createMachineCategoryAttributeObj(
          action.payload.valueOption,
        );

        draft.machineCategories = draft.machineCategories.map(
          machineCategory => {
            if (machineCategory.id === action.payload.machineCategoryId) {
              machineCategory.attributes.push(newAttribute);

              if (machineCategory.titleAttributeId.length === 0) {
                machineCategory.titleAttributeId = newAttribute.id;
              }
            }
            return machineCategory;
          },
        );

        draft.machines = draft.machines.map(machine => {
          if (machine.categoryId === action.payload.machineCategoryId) {
            machine.attributes.push(createMachineAttributeObj(newAttribute));
          }
          return machine;
        });
      });
    case DELETE_MACHINE_ATTRIBUTE:
      return produce(state, draft => {
        draft.machineCategories = draft.machineCategories.map(
          machineCategory => {
            if (machineCategory.id === action.payload.categoryId) {
              if (
                shouldDeleteCategoryAttribute(
                  machineCategory.attributes,
                  action.payload.categoryAttributeId,
                )
              ) {
                machineCategory.attributes = machineCategory.attributes.filter(
                  categoryAttr =>
                    categoryAttr.id !== action.payload.categoryAttributeId,
                );

                if (
                  machineCategory.titleAttributeId ===
                  action.payload.categoryAttributeId
                ) {
                  const textAttributes = machineCategory.attributes.filter(
                    attribute => attribute.valueOption === 'text',
                  );

                  machineCategory.titleAttributeId =
                    machineCategory.attributes.length > 0
                      ? textAttributes[0].id
                      : '';
                }

                // update child machines attributes
                draft.machines = draft.machines.map(machine => {
                  if (machine.categoryId === action.payload.categoryId) {
                    machine.attributes = machine.attributes.filter(
                      machineAttr =>
                        machineAttr.categoryAttributeId !==
                        action.payload.categoryAttributeId,
                    );
                  }
                  return machine;
                });
              } else {
                machineCategory.error = errors.minAttributeCount;
              }
            }
            return machineCategory;
          },
        );
      });
    case UPDATE_MACHINE_ATTRIBUTE_NAME:
      return produce(state, draft => {
        draft.machineCategories = draft.machineCategories.map(
          machineCategory => {
            if (machineCategory.id === action.payload.categoryId) {
              machineCategory.attributes = machineCategory.attributes.map(
                categotyAttr => {
                  if (categotyAttr.id === action.payload.categoryAttributeId) {
                    categotyAttr.name = action.payload.newAttrName;
                    categotyAttr.nameUnique = true;
                  }
                  return categotyAttr;
                },
              );
            }
            return machineCategory;
          },
        );

        draft.machines = draft.machines.map(machine => {
          if (machine.categoryId === action.payload.categoryId) {
            machine.attributes = machine.attributes.map(machineAttr => {
              if (
                machineAttr.categoryAttributeId ===
                action.payload.categoryAttributeId
              ) {
                machineAttr.name = action.payload.newAttrName;
              }
              return machineAttr;
            });
          }
          return machine;
        });
      });
    case VALIDATE_MACHINE_ATTRIBUTE_NAME:
      return produce(state, draft => {
        draft.machineCategories = draft.machineCategories.map(
          machineCategory => {
            if (machineCategory.id === action.payload.categoryId) {
              machineCategory.attributes = machineCategory.attributes.map(
                categoryAttr => {
                  if (categoryAttr.id === action.payload.categoryAttributeId) {
                    const nameUnique = isNameUnique(
                      categoryAttr.name,
                      machineCategory.attributes.map(({name}) => name),
                    );

                    // update mactched machines
                    draft.machines = draft.machines.map(machine => {
                      if (machine.categoryId === action.payload.categoryId) {
                        machine.attributes = machine.attributes.map(
                          machineAttr => {
                            if (
                              machineAttr.categoryAttributeId ===
                              action.payload.categoryAttributeId
                            ) {
                              if (!nameUnique) {
                                machineAttr.name = categoryAttr.lastUniqueName;
                              }
                            }
                            return machineAttr;
                          },
                        );
                      }
                      return machine;
                    });

                    if (nameUnique) {
                      categoryAttr.nameUnique = true;
                      categoryAttr.lastUniqueName = categoryAttr.name;
                    } else {
                      categoryAttr.nameUnique = false;
                      categoryAttr.name = categoryAttr.lastUniqueName;
                    }
                  }
                  return categoryAttr;
                },
              );
            }
            return machineCategory;
          },
        );
      });
    case UPDATE_MACHINE_ATTRIBUTE_VALUE_OPTION:
      return produce(state, draft => {
        draft.machineCategories.map(machineCategory => {
          if (machineCategory.id === action.payload.categoryId) {
            if (
              shouldChangeAttributeOption(
                machineCategory.attributes,
                action.payload.categoryAttributeId,
                action.payload.valueOption,
              )
            ) {
              machineCategory.attributes.map(categoryAttr => {
                if (categoryAttr.id === action.payload.categoryAttributeId) {
                  categoryAttr.valueOption = action.payload.valueOption;
                }
                return categoryAttr;
              });

              if (
                machineCategory.titleAttributeId ===
                  action.payload.categoryAttributeId &&
                action.payload.valueOption !== 'text'
              ) {
                const textAttributes = machineCategory.attributes.filter(
                  attribute => attribute.valueOption === 'text',
                );

                machineCategory.titleAttributeId = textAttributes[0].id;
              }

              draft.machines.map(machine => {
                if (machine.categoryId === action.payload.categoryId) {
                  machine.attributes.map(machineAttr => {
                    if (
                      machineAttr.categoryAttributeId ===
                      action.payload.categoryAttributeId
                    ) {
                      machineAttr.value = getDefaultAttributeValue(
                        action.payload.valueOption,
                      );
                    }
                    return machineAttr;
                  });
                }
                return machine;
              });
            } else {
              machineCategory.error = errors.minTextAttributeCount;
            }
          }
          return machineCategory;
        });
      });
    case UPDATE_MACHINE_TITLE_ATTRIBUTE:
      return produce(state, draft => {
        draft.machineCategories.map(machineCategory => {
          if (machineCategory.id === action.payload.categoryId) {
            machineCategory.titleAttributeId = action.payload.titleAttributeId;
          }

          return machineCategory;
        });
      });
    case CREATE_MACHINE:
      return produce(state, draft => {
        draft.machines.push(
          createMachineObj(
            action.payload.categoryName,
            action.payload.categoryId,
            action.payload.categoryAttributes,
          ),
        );
      });
    case DELETE_MACHINE:
      return produce(state, draft => {
        draft.machines = draft.machines.filter(
          machine => machine.id !== action.payload.machineId,
        );
      });
    case UPDATE_MACHINE_ATTRIBUTE_VALUE:
      return produce(state, draft => {
        draft.machines = draft.machines.map(machine => {
          if (machine.id === action.payload.machineId) {
            machine.attributes.map(machineAttr => {
              if (machineAttr.id === action.payload.machineAttributeId) {
                machineAttr.value = action.payload.value;
              }

              return machineAttr;
            });
          }

          return machine;
        });
      });
    default:
      return state;
  }
};

function useMachines(): State {
  const [state, dispatch] = useReducer(reducer, initialState);

  interface MethodsWithIndexing extends Methods {
    [key: keyof typeof actions]: Actions;
  }

  let methods: Partial<MethodsWithIndexing> = {};

  for (let key in actions) {
    if (actions.hasOwnProperty(key)) {
      (methods as MethodsWithIndexing)[key] = actions[key](dispatch);
    }
  }

  return {
    state,
    ...(methods as MethodsWithIndexing),
  };
}

export default useMachines;
