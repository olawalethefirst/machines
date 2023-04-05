import {UPDATE_MACHINE_CATEGORY_NAME, ActionBase} from './actionTypes';
import React from 'react';

export interface UpdateMachineCategoryNameA extends ActionBase {
  type: typeof UPDATE_MACHINE_CATEGORY_NAME;
  payload: {
    machineCategoryId: string;
    name: string;
  };
}
export type UpdateMachineCategoryName = (
  machineCategoryId: string,
  name: string,
) => void;

const updateMachineCategoryName =
  (dispatch: React.Dispatch<UpdateMachineCategoryNameA>) =>
  (machineCategoryId: string, name: string) => {
    dispatch({
      type: UPDATE_MACHINE_CATEGORY_NAME,
      payload: {
        machineCategoryId,
        name,
      },
    });
  };

export default updateMachineCategoryName;
