import { createSlice } from '@reduxjs/toolkit';
import { TConstructorIngredient } from '@utils-types';
import { v4 as uuidv4 } from 'uuid';
import { TConstructorItems } from '@utils-types';

export type TConstructorState = {
  bun: TConstructorIngredient | null;
  constructorItems: TConstructorItems;
};

export const initialState: TConstructorState = {
  bun: null,
  constructorItems: {
    bun: {
      price: 0
    },
    ingredients: []
  }
};

export const constructorSlice = createSlice({
  name: 'constructorIngredient',
  initialState,
  reducers: {
    addIngredient(state, action) {
      if (action.payload.type === 'bun') {
        state.constructorItems.bun = action.payload;
      } else {
        state.constructorItems.ingredients.push({
          ...action.payload,
          id: uuidv4()
        });
      }
    },
    deleteIngredient(state, action) {
      const elementIndex = state.constructorItems.ingredients.findIndex(
        (element) => element.id === action.payload.id
      );
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (_, index) => index !== elementIndex
        );
    },
    placeIngredientUp(state, action) {
      const ingredientIndex = state.constructorItems.ingredients.findIndex(
        (item) => item.id === action.payload.uniqueId
      );
      const prevItem = state.constructorItems.ingredients[ingredientIndex - 1];
      state.constructorItems.ingredients.splice(
        ingredientIndex - 1,
        2,
        action.payload,
        prevItem
      );
    },
    placeIngredientDown(state, action) {
      const ingredientIndex = state.constructorItems.ingredients.findIndex(
        (item) => item.id === action.payload.uniqueId
      );
      const nextItem = state.constructorItems.ingredients[ingredientIndex + 1];
      state.constructorItems.ingredients.splice(
        ingredientIndex,
        2,
        nextItem,
        action.payload
      );
    },
    clearAll: (state) => (state = initialState)
  },
  selectors: {
    selectConstructorItems: (state) => state.constructorItems
  }
});

export const {
  addIngredient,
  deleteIngredient,
  placeIngredientDown,
  placeIngredientUp,
  clearAll
} = constructorSlice.actions;

export const { selectConstructorItems } = constructorSlice.selectors;
