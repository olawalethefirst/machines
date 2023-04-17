import {UPDATE_MACHINE_ATTRIBUTE_NAME, ActionBase} from './actionTypes';
import React from 'react';

export interface UpdateAttributeNameA extends ActionBase {
  type: typeof UPDATE_MACHINE_ATTRIBUTE_NAME;
  payload: {
    categoryAttributeId: string;
    categoryId: string;
    newAttrName: string;
  };
}
export type UpdateAttributeName = (
  categoryAttributeId: string,
  categoryId: string,
  newAttrName: string,
) => void;

const updateAttributeName =
  (dispatch: React.Dispatch<UpdateAttributeNameA>) =>
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

export default updateAttributeName;
