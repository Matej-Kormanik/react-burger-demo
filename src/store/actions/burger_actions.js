import {ADD_INGREDIENT, REMOVE_INGREDIENT, SET_INGREDIENTS, FETCH_INGREDIENTS_FAILED} from './actionTypes';
import axios from "../../axios-orders";

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

export const initIngredients = () => {
    return dispatch => {
        axios.get('/ingredients.json').then(response => {
            dispatch(setIngredients(response.data));
        }).catch(error => {
            console.log(error);
            dispatch(fetchIngredientsFailed())
        });
    };
};

export const fetchIngredientsFailed = () => {
  return {
      type: FETCH_INGREDIENTS_FAILED
  }
};

export const setIngredients = (ingredients) => {
    return {
        type: SET_INGREDIENTS,
        ingredients: ingredients
    }
};