import {useMemo, useReducer} from 'react';
import {MachineCategory, Machine} from '../types';
import {
  CREATE_MACHINE_CATEGORY,
  DELETE_MACHINE_CATEGORY,
  UPDATE_MACHINE_CATEGORY_NAME,
  // VALIDATE_MACHINE_CATEGORY_NAME,
  CREATE_MACHINE_ATTRIBUTE,
  DELETE_MACHINE_ATTRIBUTE,
  UPDATE_MACHINE_ATTRIBUTE_NAME,
  // VALIDATE_MACHINE_ATTRIBUTE_NAME,
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
import {ClearCategoryError} from './actions/clearCategoryError';

export interface MachinesState {
  machineCategories: MachineCategory[];
  machines: {
    [key: string]: Machine[];
  };
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
  clearCategoryError: ClearCategoryError;
}
export interface Context extends Methods {
  state: MachinesState;
}

const initialState: MachinesState = {
  machineCategories: [],
  machines: {},
};

const reducer = (state: MachinesState, action: Action) => {
  switch (action.type) {
    case CREATE_MACHINE_CATEGORY: {
      const [category, id] = createMachineCategoryObj();
      return produce(state, draft => {
        draft.machineCategories.unshift(category);
        draft.machines[id] = [];
      });
    }
    case DELETE_MACHINE_CATEGORY:
      return produce(state, draft => {
        draft.machineCategories = draft.machineCategories.filter(
          machineCategory =>
            machineCategory.id !== action.payload.machineCategoryId,
        );
        delete draft.machines[action.payload.machineCategoryId];
      });
    case UPDATE_MACHINE_CATEGORY_NAME:
      return produce(state, draft => {
        draft.machineCategories.forEach(machineCategory => {
          if (machineCategory.id === action.payload.machineCategoryId) {
            const nameUnique = isNameUnique(
              action.payload.name,
              draft.machineCategories
                .filter(
                  category => category.id !== action.payload.machineCategoryId,
                )
                .map(({name}) => name),
            );

            if (nameUnique) {
              machineCategory.nameUnique = true;
              machineCategory.name = action.payload.name;
            } else {
              machineCategory.nameUnique = false;
            }
          }
        });
      });
    case CLEAR_CATEGORY_ERROR:
      return produce(state, draft => {
        draft.machineCategories.forEach(category => {
          if (category.id === action.payload.categoryId) {
            category.error = '';
          }
        });
      });
    case CREATE_MACHINE_ATTRIBUTE:
      return produce(state, draft => {
        const newAttribute = createMachineCategoryAttributeObj(
          action.payload.valueOption,
        );

        draft.machineCategories.forEach(machineCategory => {
          if (machineCategory.id === action.payload.machineCategoryId) {
            machineCategory.attributes.push(newAttribute);

            if (machineCategory.titleAttributeId.length === 0) {
              machineCategory.titleAttributeId = newAttribute.id;
            }
          }
        });

        draft.machines[action.payload.machineCategoryId].forEach(machine => {
          machine.attributes.push(createMachineAttributeObj(newAttribute));
        });
      });
    case DELETE_MACHINE_ATTRIBUTE:
      return produce(state, draft => {
        draft.machineCategories.forEach(machineCategory => {
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
              draft.machines[action.payload.categoryId].forEach(machine => {
                machine.attributes = machine.attributes.filter(
                  machineAttr =>
                    machineAttr.categoryAttributeId !==
                    action.payload.categoryAttributeId,
                );
              });
            } else {
              machineCategory.error = errors.minAttributeCount;
            }
          }
        });
      });
    case UPDATE_MACHINE_ATTRIBUTE_NAME:
      return produce(state, draft => {
        draft.machineCategories.forEach(machineCategory => {
          if (machineCategory.id === action.payload.categoryId) {
            machineCategory.attributes.forEach(categoryAttr => {
              if (categoryAttr.id === action.payload.categoryAttributeId) {
                const nameUnique = isNameUnique(
                  action.payload.newAttrName,
                  machineCategory.attributes
                    .filter(
                      attr => attr.id !== action.payload.categoryAttributeId,
                    )
                    .map(({name}) => name),
                );

                if (nameUnique) {
                  categoryAttr.nameUnique = true;
                  categoryAttr.name = action.payload.newAttrName;
                } else {
                  categoryAttr.nameUnique = false;
                }
              }
            });
          }
        });
      });
    case UPDATE_MACHINE_ATTRIBUTE_VALUE_OPTION:
      return produce(state, draft => {
        draft.machineCategories.forEach(machineCategory => {
          if (machineCategory.id === action.payload.categoryId) {
            if (
              shouldChangeAttributeOption(
                machineCategory.attributes,
                action.payload.categoryAttributeId,
                action.payload.valueOption,
              )
            ) {
              machineCategory.attributes.forEach(categoryAttr => {
                if (categoryAttr.id === action.payload.categoryAttributeId) {
                  categoryAttr.valueOption = action.payload.valueOption;
                }
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

              draft.machines[action.payload.categoryId].forEach(machine => {
                machine.attributes.forEach(machineAttr => {
                  if (
                    machineAttr.categoryAttributeId ===
                    action.payload.categoryAttributeId
                  ) {
                    machineAttr.value = getDefaultAttributeValue(
                      action.payload.valueOption,
                    );
                  }
                });
              });
            } else {
              machineCategory.error = errors.minTextAttributeCount;
            }
          }
        });
      });
    case UPDATE_MACHINE_TITLE_ATTRIBUTE:
      return produce(state, draft => {
        draft.machineCategories.forEach(machineCategory => {
          if (machineCategory.id === action.payload.categoryId) {
            machineCategory.titleAttributeId = action.payload.titleAttributeId;
          }
        });
      });
    case CREATE_MACHINE:
      return produce(state, draft => {
        draft.machines[action.payload.categoryId].unshift(
          createMachineObj(
            action.payload.categoryId,
            action.payload.categoryAttributes,
          ),
        );
      });
    case DELETE_MACHINE:
      return produce(state, draft => {
        draft.machines[action.payload.categoryId] = draft.machines[
          action.payload.categoryId
        ].filter(machine => machine.id !== action.payload.machineId);
      });
    case UPDATE_MACHINE_ATTRIBUTE_VALUE:
      return produce(state, draft => {
        draft.machines[action.payload.categoryId].forEach(machine => {
          if (machine.id === action.payload.machineId) {
            machine.attributes.forEach(machineAttr => {
              if (machineAttr.id === action.payload.machineAttributeId) {
                machineAttr.value = action.payload.value;
              }
            });
          }
        });
      });
    default:
      return state;
  }
};

interface MethodsWithIndexing extends Methods {
  [key: keyof typeof actions]: Actions;
}
let methods: Partial<MethodsWithIndexing> = {};
function useMachines(): Context {
  const [state, dispatch] = useReducer(reducer, initialState);

  useMemo(() => {
    for (let key in actions) {
      if (actions.hasOwnProperty(key)) {
        (methods as MethodsWithIndexing)[key] = actions[key](dispatch);
      }
    }
  }, []);

  return {
    state,
    ...(methods as Methods),
  };
}

export default useMachines;
