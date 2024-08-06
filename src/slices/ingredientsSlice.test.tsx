import { configureStore } from "@reduxjs/toolkit"
import { getIngredientsList, ingredientsSlice, initialState, selectIngredients, selectIngredientsLoading, selectIngredientsState } from "./ingredientsSlice"
import { ingredientsMockData } from "./testData"

describe('Тесты ingredientsSlice: селекторы', () => {
  test('Селектор selectIngredients, selectIngredientsLoading, selectIngredientsState', () => {
    const store = configureStore({
      reducer: {
        ingredients: ingredientsSlice.reducer
      },
      preloadedState: {
        ingredients: ingredientsMockData
      }
    });
    const ingredientsState = selectIngredientsState(store.getState());
    const loading = selectIngredientsLoading(store.getState());
    const ingredients = selectIngredients(store.getState());
    expect(ingredientsState).toEqual(ingredientsMockData);
    expect(loading).toEqual(ingredientsMockData.loading);
    expect(ingredients).toEqual(ingredientsMockData.ingredients);
  })
})

describe('Тесты ingredientsSlice: асинхронные экшены', () => {
  test('Экшен getIngredientsList: fulfilled', () => {
    const action = {
      type: getIngredientsList.fulfilled.type,
      payload: ingredientsMockData.ingredients
    };
    const receivedData = ingredientsSlice.reducer(initialState, action);
    expect(receivedData.loading === false);
    expect(receivedData.ingredients === ingredientsMockData.ingredients);
  });

  test('Экшен getIngredientsList: rejected', () => {
    const state = ingredientsSlice.reducer(
      initialState,
      getIngredientsList.rejected(new Error('error'), 'Ошибка тестирования')
    );
    expect(state.loading === false);
    expect(state.error === 'Ошибка тестирования')
  });

  test('Экшен getIngredientsList: pending', () => {
    const state = ingredientsSlice.reducer(
      initialState,
      getIngredientsList.pending('')
    );
    expect(state.loading === true);
    expect(state.error === null);
  })
})

// asdf
