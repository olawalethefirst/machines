import {CREATE_MACHINE_ATTRIBUTE, ActionBase} from './actionTypes';
import React from 'react';
import {AttributeValueOptions} from '../../types';

export interface CreateMachineAttributeA extends ActionBase {
  type: typeof CREATE_MACHINE_ATTRIBUTE;
  payload: {
    machineCategoryId: string;
    valueOption: AttributeValueOptions;
  };
}
export type CreateMachineAttribute = (
  machineCategoryId: string,
  valueOption: AttributeValueOptions,
) => void;

const createMachineAttribute =
  (dispatch: React.Dispatch<CreateMachineAttributeA>) =>
  (machineCategoryId: string, valueOption: AttributeValueOptions) => {
    dispatch({
      type: CREATE_MACHINE_ATTRIBUTE,
      payload: {
        machineCategoryId,
        valueOption,
      },
    });
  };

export default createMachineAttribute;
