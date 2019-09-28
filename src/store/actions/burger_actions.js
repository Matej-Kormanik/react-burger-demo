import {ADD_INGREDIENT, REMOVE_INGREDIENT} from './actionTypes';

export const addIngredient = (ingredientName) => {
  return {
      type: ADD_INGREDIENT,
      ingredientName: ingredientName
  }
};

export const removeIngredient = (ingredientName) => {
    return {
        type: REMOVE_INGREDIENT,
        ingredientName: ingredientName
    }
};