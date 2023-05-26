import {useReducer, Dispatch} from 'react';
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
import {Action} from './actions';
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

export interface MachinesState {
  machineCategories: MachineCategory[];
  machines: {
    [key: string]: Machine[];
  };
}
export interface Context {
  state: MachinesState;
  dispatch: Dispatch<Action>;
}

const initialState: MachinesState = {
  machineCategories: [
    ...new Array(30).fill(undefined).map(() => createMachineCategoryObj()[0]),
  ],
  machines: {},
};

const reducer = (state: MachinesState, action: Action) => {
  switch (action.type) {
    case CREATE_MACHINE_CATEGORY: {
      const [category, id] = createMachineCategoryObj();
      return produce(state, draft => {
        draft.machineCategories.push(category);
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
            machineCategory.name = action.payload.name;
          }
        });
      });
    case VALIDATE_MACHINE_CATEGORY_NAME:
      return produce(state, draft => {
        draft.machineCategories.forEach(machineCategory => {
          if (machineCategory.id === action.payload.machineCategoryId) {
            const nameUnique = isNameUnique(
              machineCategory.id,
              machineCategory.name,
              draft.machineCategories,
            );

            if (nameUnique) {
              machineCategory.nameUnique = true;
              machineCategory.lastUniqueName = machineCategory.name;
            } else {
              machineCategory.nameUnique = false;
              machineCategory.name = machineCategory.lastUniqueName;
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
            machineCategory.attributes[newAttribute.id] = newAttribute;
          }
        });

        draft.machines[action.payload.machineCategoryId].forEach(machine => {
          const newMachineAttribute = createMachineAttributeObj(newAttribute);

          machine.attributes[newMachineAttribute.id] = newMachineAttribute;
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
              delete machineCategory.attributes[
                action.payload.categoryAttributeId
              ];

              if (
                machineCategory.titleAttributeId ===
                action.payload.categoryAttributeId
              ) {
                const categoryAttributesArr = Object.values(
                  machineCategory.attributes,
                );
                const textAttributes = categoryAttributesArr.filter(
                  attribute => attribute.valueOption === 'text',
                );

                machineCategory.titleAttributeId = textAttributes[0].id;
              }

              // update child machines attributes
              draft.machines[action.payload.categoryId].forEach(machine => {
                const machineAttributes = machine.attributes;

                for (let machineAttributeKey in machineAttributes) {
                  if (
                    machineAttributes[machineAttributeKey]
                      .categoryAttributeId ===
                    action.payload.categoryAttributeId
                  ) {
                    delete machineAttributes[machineAttributeKey];
                  }
                }
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
            machineCategory.attributes[
              action.payload.categoryAttributeId
            ].name = action.payload.newAttrName;
          }
        });
      });
    case VALIDATE_MACHINE_ATTRIBUTE_NAME:
      return produce(state, draft => {
        draft.machineCategories.forEach(machineCategory => {
          if (machineCategory.id === action.payload.categoryId) {
            const attribute =
              machineCategory.attributes[action.payload.categoryAttributeId];

            const nameUnique = isNameUnique(
              attribute.id,
              attribute.name,
              Object.values(machineCategory.attributes),
            );

            if (nameUnique) {
              attribute.nameUnique = true;
              attribute.lastUniqueName = attribute.name;
            } else {
              attribute.nameUnique = false;
              attribute.name = attribute.lastUniqueName;
            }
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
              machineCategory.attributes[
                action.payload.categoryAttributeId
              ].valueOption = action.payload.valueOption;

              if (
                machineCategory.titleAttributeId ===
                  action.payload.categoryAttributeId &&
                action.payload.valueOption !== 'text'
              ) {
                const attributesArr = Object.values(machineCategory.attributes);

                const textAttributes = attributesArr.filter(
                  attribute => attribute.valueOption === 'text',
                );

                machineCategory.titleAttributeId = textAttributes[0].id;
              }

              // Todo: change machines implementation
              draft.machines[action.payload.categoryId].forEach(machine => {
                const machineAttributes = machine.attributes;

                for (let machineAttributeKey in machineAttributes) {
                  if (
                    machineAttributes[machineAttributeKey]
                      .categoryAttributeId ===
                    action.payload.categoryAttributeId
                  ) {
                    machineAttributes[machineAttributeKey].value =
                      getDefaultAttributeValue(action.payload.valueOption);
                  }
                }
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
        draft.machines[action.payload.categoryId].push(
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
            machine.attributes[action.payload.machineAttributeId].value =
              action.payload.value;
          }
        });
      });
    default:
      return state;
  }
};

function useMachines(): Context {
  const [state, dispatch] = useReducer(reducer, initialState);

  return {
    state,
    dispatch,
  };
}

export default useMachines;
