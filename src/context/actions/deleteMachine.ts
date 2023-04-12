import {DELETE_MACHINE, ActionBase} from './actionTypes';
import React from 'react';

export interface DeleteMachineA extends ActionBase {
  type: typeof DELETE_MACHINE;
  payload: {
    machineId: string;
    categoryId: string;
  };
}
export type DeleteMachine = (machineId: string, categoryId: string) => void;

const deleteMachine =
  (dispatch: React.Dispatch<DeleteMachineA>) =>
  (machineId: string, categoryId: string) => {
    dispatch({
      type: DELETE_MACHINE,
      payload: {
        machineId,
        categoryId,
      },
    });
  };
export default deleteMachine;
