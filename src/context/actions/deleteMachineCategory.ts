import {DELETE_MACHINE_CATEGORY, ActionBase} from './actionTypes';
import React from 'react';

export interface DeleteMachineCategoryA extends ActionBase {
  type: typeof DELETE_MACHINE_CATEGORY;
  payload: {
    machineCategoryId: string;
  };
}
export type DeleteMachineCategory = (machineCategoryId: string) => void;

const deleteMachineCategory =
  (dispatch: React.Dispatch<DeleteMachineCategoryA>) =>
  (machineCategoryId: string) => {
    dispatch({
      type: DELETE_MACHINE_CATEGORY,
      payload: {
        machineCategoryId,
      },
    });
  };

export default deleteMachineCategory;
