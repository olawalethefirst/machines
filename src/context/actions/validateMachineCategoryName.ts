import {VALIDATE_MACHINE_CATEGORY_NAME, ActionBase} from './actionTypes';
import React from 'react';

export interface ValidateMachineCategoryNameA extends ActionBase {
  type: typeof VALIDATE_MACHINE_CATEGORY_NAME;
  payload: {
    machineCategoryId: string;
  };
}
export type ValidateMachineCategoryName = (machineCategoryId: string) => void;

const validateMachineCategoryName =
  (dispatch: React.Dispatch<ValidateMachineCategoryNameA>) =>
  (machineCategoryId: string) => {
    dispatch({
      type: VALIDATE_MACHINE_CATEGORY_NAME,
      payload: {
        machineCategoryId,
      },
    });
  };

export default validateMachineCategoryName;
