import {DELETE_MACHINE_ATTRIBUTE, ActionBase} from './actionTypes';

export interface DeleteMachineAttributeA extends ActionBase {
  type: typeof DELETE_MACHINE_ATTRIBUTE;
  payload: {
    categoryAttributeId: string;
    categoryId: string;
  };
}
export type DeleteMachineAttribute = (
  categoryAttributeId: string,
  categoryId: string,
) => void;

const deleteMachineAttribute =
  (dispatch: React.Dispatch<DeleteMachineAttributeA>) =>
  (categoryAttributeId: string, categoryId: string) => {
    dispatch({
      type: DELETE_MACHINE_ATTRIBUTE,
      payload: {
        categoryAttributeId,
        categoryId,
      },
    });
  };

export default deleteMachineAttribute;
