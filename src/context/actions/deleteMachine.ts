import {DELETE_MACHINE, ActionBase} from './actionTypes';
import React from 'react';

export interface DeleteMachineA extends ActionBase {
  type: typeof DELETE_MACHINE;
  payload: {
    machineId: string;
  };
}
export type DeleteMachine = (machineId: string) => void;

const deleteMachine =
  (dispatch: React.Dispatch<DeleteMachineA>) => (machineId: string) => {
    dispatch({
      type: DELETE_MACHINE,
      payload: {
        machineId,
      },
    });
  };
export default deleteMachine;
