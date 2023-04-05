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
} from './actions/actionTypes';
import actions, {Action} from './actions';
import produce from 'immer';
import {
  createMachineCategoryObj,
  isNameUnique,
  createMachineCategoryAttributeObj,
  createMachineAttributeObj,
  getDefaultAttributeValue,
  createMachineObj,
} from './utils';

export interface UseMachinesState {
  machineCategories: MachineCategory[];
  machines: Machine[];
  // pickers: {}
}

const initialState: UseMachinesState = {
  machineCategories: [],
  machines: [],
};
const reducer = (state: UseMachinesState, action: Action) => {
  switch (action.type) {
    case CREATE_MACHINE_CATEGORY:
      return produce(initialState, draft => {
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
              return produce(machineCategory, machineCategoryDraft => {
                machineCategoryDraft.name = action.payload.name;
              });
            }
            return machineCategory;
          },
        );
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
                return produce(machineCategory, machineCategoryDraft => {
                  machineCategoryDraft.nameUnique = true;
                  machineCategoryDraft.lastUniqueName =
                    machineCategoryDraft.name;
                });
              } else {
                return produce(machineCategory, machineCategoryDraft => {
                  machineCategoryDraft.nameUnique = false;
                  machineCategoryDraft.name =
                    machineCategoryDraft.lastUniqueName;
                });
              }
            }
            return machineCategory;
          },
        );
      });
    case CREATE_MACHINE_ATTRIBUTE:
      return produce(state, draft => {
        const newAttribute = createMachineCategoryAttributeObj(
          action.payload.valueOption,
        );

        draft.machineCategories = draft.machineCategories.map(
          machineCategory => {
            if (machineCategory.id === action.payload.machineCategoryId) {
              return produce(machineCategory, machineCategoryDraft => {
                machineCategoryDraft.attributes.push(newAttribute);

                if (machineCategory.titleAttributeId.length === 0) {
                  machineCategory.titleAttributeId = newAttribute.id;
                }
              });
            }
            return machineCategory;
          },
        );

        draft.machines = draft.machines.map(machine => {
          if (machine.categoryId === action.payload.machineCategoryId) {
            return produce(machine, machineDraft => {
              machineDraft.attributes.push(
                createMachineAttributeObj(newAttribute),
              );
            });
          }
          return machine;
        });
      });
    case DELETE_MACHINE_ATTRIBUTE:
      return produce(state, draft => {
        draft.machineCategories = draft.machineCategories.map(
          machineCategory => {
            if (machineCategory.id === action.payload.categoryId) {
              return produce(machineCategory, machineCategoryDraft => {
                machineCategoryDraft.attributes =
                  machineCategoryDraft.attributes.filter(
                    categoryAttr =>
                      categoryAttr.id !== action.payload.categoryAttributeId,
                  );

                if (
                  machineCategory.titleAttributeId ===
                  action.payload.categoryAttributeId
                ) {
                  machineCategory.titleAttributeId =
                    machineCategory.attributes.length > 0
                      ? machineCategory.attributes[0].id
                      : '';
                }
              });
            }
            return machineCategory;
          },
        );

        draft.machines = draft.machines.map(machine => {
          if (machine.categoryId === action.payload.categoryId) {
            return produce(machine, machineDraft => {
              machineDraft.attributes = machineDraft.attributes.filter(
                machineAttr =>
                  machineAttr.categoryAttributeId !==
                  action.payload.categoryAttributeId,
              );
            });
          }
          return machine;
        });
      });
    case UPDATE_MACHINE_ATTRIBUTE_NAME:
      return produce(state, draft => {
        draft.machineCategories = draft.machineCategories.map(
          machineCategory => {
            if (machineCategory.id === action.payload.categoryId) {
              return produce(machineCategory, machineCategoryDraft => {
                machineCategoryDraft.attributes =
                  machineCategoryDraft.attributes.map(categotyAttr => {
                    if (
                      categotyAttr.id === action.payload.categoryAttributeId
                    ) {
                      return produce(categotyAttr, categotyAttrDraft => {
                        categotyAttrDraft.name = action.payload.newAttrName;
                      });
                    }
                    return categotyAttr;
                  });
              });
            }
            return machineCategory;
          },
        );

        draft.machines = draft.machines.map(machine => {
          if (machine.categoryId === action.payload.categoryId) {
            return produce(machine, machineDraft => {
              machineDraft.attributes = machineDraft.attributes.map(
                machineAttr => {
                  if (
                    machineAttr.categoryAttributeId ===
                    action.payload.categoryAttributeId
                  ) {
                    return produce(machineAttr, machineAttrDraft => {
                      machineAttrDraft.name = action.payload.newAttrName;
                    });
                  }
                  return machineAttr;
                },
              );
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
              return produce(machineCategory, machineCategoryDraft => {
                machineCategoryDraft.attributes =
                  machineCategoryDraft.attributes.map(categoryAttr => {
                    if (
                      categoryAttr.id === action.payload.categoryAttributeId
                    ) {
                      return produce(categoryAttr, categoryAttrDraft => {
                        const nameUnique = isNameUnique(
                          categoryAttr.name,
                          machineCategoryDraft.attributes.map(({name}) => name),
                        );

                        // update mactched machines
                        draft.machines = draft.machines.map(machine => {
                          if (
                            machine.categoryId === action.payload.categoryId
                          ) {
                            return produce(machine, machineDraft => {
                              machineDraft.attributes =
                                machineDraft.attributes.map(machineAttr => {
                                  if (
                                    machineAttr.categoryAttributeId ===
                                    action.payload.categoryAttributeId
                                  ) {
                                    return produce(
                                      machineAttr,
                                      machineAttrDraft => {
                                        if (!nameUnique) {
                                          machineAttrDraft.name =
                                            categoryAttrDraft.lastUniqueName;
                                        }
                                      },
                                    );
                                  }
                                  return machineAttr;
                                });
                            });
                          }
                          return machine;
                        });

                        if (nameUnique) {
                          categoryAttrDraft.nameUnique = true;
                          categoryAttrDraft.lastUniqueName =
                            categoryAttrDraft.name;
                        } else {
                          categoryAttrDraft.nameUnique = false;
                          categoryAttrDraft.name =
                            categoryAttrDraft.lastUniqueName;
                        }
                      });
                    }
                    return categoryAttr;
                  });
              });
            }
            return machineCategory;
          },
        );
      });
    case UPDATE_MACHINE_ATTRIBUTE_VALUE_OPTION:
      return produce(state, draft => {
        draft.machineCategories.map(machineCategory => {
          if (machineCategory.id === action.payload.categoryId) {
            return produce(machineCategory, machineCategoryDraft => {
              machineCategoryDraft.attributes.map(categoryAttr => {
                if (categoryAttr.id === action.payload.categoryAttributeId) {
                  return produce(categoryAttr, categoryAttrDraft => {
                    categoryAttrDraft.valueOption = action.payload.valueOption;
                  });
                }
                return categoryAttr;
              });
            });
          }
          return machineCategory;
        });

        draft.machines.map(machine => {
          if (machine.categoryId === action.payload.categoryId) {
            return produce(machine, machineDraft => {
              machineDraft.attributes.map(machineAttr => {
                if (
                  machineAttr.categoryAttributeId ===
                  action.payload.categoryAttributeId
                ) {
                  return produce(machineAttr, machineAttrDraft => {
                    machineAttrDraft.value = getDefaultAttributeValue(
                      action.payload.valueOption,
                    );
                  });
                }
                return machineAttr;
              });
            });
          }
          return machine;
        });
      });
    case UPDATE_MACHINE_TITLE_ATTRIBUTE:
      return produce(state, draft => {
        draft.machineCategories.map(machineCategory => {
          if (machineCategory.id === action.payload.categoryId) {
            produce(machineCategory, machineCategoryDraft => {
              machineCategoryDraft.titleAttributeId =
                action.payload.titleAttributeId;
            });
          }

          return machineCategory;
        });
      });
    case CREATE_MACHINE:
      return produce(state, draft => {
        draft.machines.push(
          createMachineObj(
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
            produce(machine, machineDraft => {
              machineDraft.attributes.map(machineAttr => {
                if (machineAttr.id === action.payload.machineAttributeId) {
                  produce(machineAttr, machineAttrDraft => {
                    machineAttrDraft.value = action.payload.value;
                  });
                }

                return machineAttr;
              });
            });
          }

          return machine;
        });
      });
    default:
      return state;
  }
};

function useMachines() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const createMachine = actions.createMachine(dispatch);
  const createMachineAttribute = actions.createMachineAttribute(dispatch);
  const createMachineCategory = actions.createMachineCategory(dispatch);
  const deleteMachine = actions.deleteMachine(dispatch);
  const deleteMachineAttribute = actions.deleteMachineAttribute(dispatch);
  const deleteMachineCategory = actions.deleteMachineCategory(dispatch);
  const updateAttributeValue = actions.updateAttributeValue(dispatch);
  const updateAttributeValueOption =
    actions.updateAttributeValueOption(dispatch);
  const updateMachineAttributeName =
    actions.updateMachineAttributeName(dispatch);
  const updateMachineCategoryName = actions.updateMachineCategoryName(dispatch);
  const updateMachineTitleAttribute =
    actions.updateMachineTitleAttribute(dispatch);
  const validateMachineAttributeName =
    actions.validateMachineAttributeName(dispatch);
  const validateMachineCategoryName =
    actions.validateMachineCategoryName(dispatch);

  return {
    state,
    createMachine,
    createMachineAttribute,
    createMachineCategory,
    deleteMachine,
    deleteMachineAttribute,
    deleteMachineCategory,
    updateAttributeValue,
    updateAttributeValueOption,
    updateMachineAttributeName,
    updateMachineCategoryName,
    updateMachineTitleAttribute,
    validateMachineAttributeName,
    validateMachineCategoryName,
  };
}

export default useMachines;
