import {UPDATE_MACHINE_ATTRIBUTE_NAME, ActionBase} from './actionTypes';
import React from 'react';

export interface UpdateMachineAttributeNameA extends ActionBase {
  type: typeof UPDATE_MACHINE_ATTRIBUTE_NAME;
  payload: {
    categoryAttributeId: string;
    categoryId: string;
    newAttrName: string;
  };
}
export type UpdateMachineAttributeName = (
  categoryAttributeId: string,
  categoryId: string,
  newAttrName: string,
) => void;

const updateMachineAttributeName =
  (dispatch: React.Dispatch<UpdateMachineAttributeNameA>) =>
  (categoryAttributeId: string, categoryId: string, newAttrName: string) => {
    dispatch({
      type: UPDATE_MACHINE_ATTRIBUTE_NAME,
      payload: {
        categoryAttributeId,
        categoryId,
        newAttrName,
      },
    });
  };

export default updateMachineAttributeName;
