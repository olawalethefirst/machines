import {VALIDATE_MACHINE_ATTRIBUTE_NAME, ActionBase} from './actionTypes';
import React from 'react';

export interface ValidateAttributeNameA extends ActionBase {
  type: typeof VALIDATE_MACHINE_ATTRIBUTE_NAME;
  payload: {
    categoryAttributeId: string;
    categoryId: string;
  };
}
export type ValidateAttributeName = (
  categoryAttributeId: string,
  categoryId: string,
) => void;

const validateAttributeName =
  (dispatch: React.Dispatch<ValidateAttributeNameA>) =>
  (categoryAttributeId: string, categoryId: string) => {
    dispatch({
      type: VALIDATE_MACHINE_ATTRIBUTE_NAME,
      payload: {
        categoryAttributeId,
        categoryId,
      },
    });
  };

export default validateAttributeName;
