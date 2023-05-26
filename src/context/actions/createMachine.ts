import {CREATE_MACHINE, ActionBase} from './actionTypes';
import React from 'react';
import {MachineCategoryAttribute} from '../../types';

export interface CreateMachineA extends ActionBase {
  type: typeof CREATE_MACHINE;
  payload: {
    categoryId: string;
    categoryAttributes: {[key: string]: MachineCategoryAttribute};
  };
}
export type CreateMachine = (
  categoryId: string,
  categoryAttributes: {[key: string]: MachineCategoryAttribute},
) => void;

const createMachine =
  (dispatch: React.Dispatch<CreateMachineA>) =>
  (
    categoryId: string,
    categoryAttributes: {[key: string]: MachineCategoryAttribute},
  ) => {
    dispatch({
      type: CREATE_MACHINE,
      payload: {
        categoryId,
        categoryAttributes,
      },
    });
  };

export default createMachine;
