import {UPDATE_MACHINE_ATTRIBUTE_VALUE, ActionBase} from './actionTypes';
import React from 'react';
import {AtrributeValue} from '../../types';

export interface UpdateAttributeValueA extends ActionBase {
  type: typeof UPDATE_MACHINE_ATTRIBUTE_VALUE;
  payload: {
    machineAttributeId: string;
    machineId: string;
    value: AtrributeValue;
  };
}
export type UpdateAttributeValue = (
  machineAttributeId: string,
  machineId: string,
  value: AtrributeValue,
) => void;

const updateAttributeValue =
  (dispatch: React.Dispatch<UpdateAttributeValueA>) =>
  (machineAttributeId: string, machineId: string, value: AtrributeValue) => {
    dispatch({
      type: UPDATE_MACHINE_ATTRIBUTE_VALUE,
      payload: {
        machineAttributeId,
        machineId,
        value,
      },
    });
  };

export default updateAttributeValue;
