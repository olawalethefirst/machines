import {VALIDATE_MACHINE_ATTRIBUTE_NAME, ActionBase} from './actionTypes';
import React from 'react';

export interface ValidateMachineAttributeNameA extends ActionBase {
  type: typeof VALIDATE_MACHINE_ATTRIBUTE_NAME;
  payload: {
    categoryAttributeId: string;
    categoryId: string;
  };
}
export type ValidateMachineAttributeName = (
  categoryAttributeId: string,
  categoryId: string,
) => void;

const validateMachineAttributeName =
  (dispatch: React.Dispatch<ValidateMachineAttributeNameA>) =>
  (categoryAttributeId: string, categoryId: string) => {
    dispatch({
      type: VALIDATE_MACHINE_ATTRIBUTE_NAME,
      payload: {
        categoryAttributeId,
        categoryId,
      },
    });
  };

export default validateMachineAttributeName;
