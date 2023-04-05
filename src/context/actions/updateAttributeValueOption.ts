import {UPDATE_MACHINE_ATTRIBUTE_VALUE_OPTION, ActionBase} from './actionTypes';
import React from 'react';
import {AttributeValueOptions} from '../../types';

export interface UpdateAttributeValueOptionA extends ActionBase {
  type: typeof UPDATE_MACHINE_ATTRIBUTE_VALUE_OPTION;
  payload: {
    categoryAttributeId: string;
    categoryId: string;
    valueOption: AttributeValueOptions;
  };
}
export type UpdateAttributeValueOption = (
  categoryAttributeId: string,
  categoryId: string,
  valueOption: AttributeValueOptions,
) => void;

const updateAttributeValueOption =
  (dispatch: React.Dispatch<UpdateAttributeValueOptionA>) =>
  (
    categoryAttributeId: string,
    categoryId: string,
    valueOption: AttributeValueOptions,
  ) => {
    dispatch({
      type: UPDATE_MACHINE_ATTRIBUTE_VALUE_OPTION,
      payload: {
        categoryAttributeId,
        categoryId,
        valueOption,
      },
    });
  };

export default updateAttributeValueOption;
