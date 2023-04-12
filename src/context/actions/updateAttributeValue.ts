import {UPDATE_MACHINE_ATTRIBUTE_VALUE, ActionBase} from './actionTypes';
import React from 'react';
import {AttributeValue} from '../../types';

export interface UpdateAttributeValueA extends ActionBase {
  type: typeof UPDATE_MACHINE_ATTRIBUTE_VALUE;
  payload: {
    machineAttributeId: string;
    machineId: string;
    value: AttributeValue;
    categoryId: string;
  };
}
export type UpdateAttributeValue = (
  machineAttributeId: string,
  machineId: string,
  value: AttributeValue,
  categoryId: string,
) => void;

const updateAttributeValue =
  (dispatch: React.Dispatch<UpdateAttributeValueA>) =>
  (
    machineAttributeId: string,
    machineId: string,
    value: AttributeValue,
    categoryId: string,
  ) => {
    dispatch({
      type: UPDATE_MACHINE_ATTRIBUTE_VALUE,
      payload: {
        machineAttributeId,
        machineId,
        value,
        categoryId,
      },
    });
  };

export default updateAttributeValue;
