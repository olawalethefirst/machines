import {CREATE_MACHINE_CATEGORY, ActionBase} from './actionTypes';
import React from 'react';

export type ActionWithoutPayload = Omit<ActionBase, 'payload'>;

export interface CreateMachineCategoryA extends ActionWithoutPayload {
  type: typeof CREATE_MACHINE_CATEGORY;
}
export type CreateMachineCategory = () => void;

const createMachineCategory =
  (dispatch: React.Dispatch<CreateMachineCategoryA>) => () => {
    dispatch({
      type: CREATE_MACHINE_CATEGORY,
    });
  };

export default createMachineCategory;
