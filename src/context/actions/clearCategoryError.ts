import {CLEAR_CATEGORY_ERROR, ActionBase} from './actionTypes';
import {Dispatch} from 'react';

export interface ClearCategoryErrorA extends ActionBase {
  type: typeof CLEAR_CATEGORY_ERROR;
  payload: {
    categoryId: string;
  };
}

export type ClearCategoryError = (cateogryId: string) => void;

const clearCategoryError =
  (dispatch: Dispatch<ClearCategoryErrorA>) => (categoryId: string) => {
    dispatch({
      type: CLEAR_CATEGORY_ERROR,
      payload: {
        categoryId,
      },
    });
  };

export default clearCategoryError;
