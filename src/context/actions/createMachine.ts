import {CREATE_MACHINE, ActionBase} from './actionTypes';
import React from 'react';
import {MachineCategoryAttribute} from '../../types';

export interface CreateMachineA extends ActionBase {
  type: typeof CREATE_MACHINE;
  payload: {
    categoryId: string;
    categoryName: string;
    categoryAttributes: MachineCategoryAttribute[];
  };
}
export type CreateMachine = (
  categoryId: string,
  categoryName: string,
  categoryAttributes: MachineCategoryAttribute[],
) => void;

const createMachine =
  (dispatch: React.Dispatch<CreateMachineA>) =>
  (
    categoryId: string,
    categoryName: string,
    categoryAttributes: MachineCategoryAttribute[],
  ) => {
    dispatch({
      type: CREATE_MACHINE,
      payload: {
        categoryId,
        categoryAttributes,
        categoryName,
      },
    });
  };

export default createMachine;
