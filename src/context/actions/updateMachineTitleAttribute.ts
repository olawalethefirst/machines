import {UPDATE_MACHINE_TITLE_ATTRIBUTE, ActionBase} from './actionTypes';
import React from 'react';

export interface UpdateMachineTitleAttributeA extends ActionBase {
  type: typeof UPDATE_MACHINE_TITLE_ATTRIBUTE;
  payload: {
    categoryId: string;
    titleAttributeId: string;
  };
}
export type UpdateMachineTitleAttribute = (
  categoryId: string,
  titleAttributeId: string,
) => void;

const updateMachineTitleAttribute =
  (dispatch: React.Dispatch<UpdateMachineTitleAttributeA>) =>
  (categoryId: string, titleAttributeId: string) => {
    dispatch({
      type: UPDATE_MACHINE_TITLE_ATTRIBUTE,
      payload: {
        categoryId,
        titleAttributeId,
      },
    });
  };

export default updateMachineTitleAttribute;
