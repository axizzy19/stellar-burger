import {expect, test, describe} from '@jest/globals';
import { addIngredient, clearAll, constructorSlice, deleteIngredient, initialState, placeIngredientDown, placeIngredientUp, selectConstructorItems } from "./constructorSlice"
import { bunIngredient, constructorIngredients, constructorIngredientsAfter, constructorMockData, tabIngredient, tabIngredientToMove } from "./testData"
import { configureStore } from '@reduxjs/toolkit';


describe('Тесты constructorSlice: селекторы', () => {
  test('Селектор selectConstructorItems', () => {
    const store = configureStore({
      reducer: {
        constructorIngredient: constructorSlice.reducer
      },
      preloadedState: {
        constructorIngredient: constructorMockData
      }
    })
    const constructorItems = selectConstructorItems(store.getState());
    expect(constructorItems).toEqual(constructorMockData.constructorItems)
  })
})

describe('Тесты constructorSlice: редьюсеры', () => {
  test('Добавить ингредиент', () => {
    const newState = constructorSlice.reducer(
      initialState,
      addIngredient(bunIngredient)
    );

    const {constructorItems, bun} = newState;

    expect(bun?.name === 'Краторная булка N-200i');
  });

  test('Удалить ингредиент', () => {
    const newState = constructorSlice.reducer(
      {
        bun: null,
        constructorItems: {
          bun: {
            price: 0
          },
          ingredients: [
            {
              id: '643d69a5c3f7b9001cfa0941',
              _id: '643d69a5c3f7b9001cfa0941',
              name: 'Биокотлета из марсианской Магнолии',
              type: 'main',
              proteins: 420,
              fat: 142,
              carbohydrates: 242,
              calories: 4242,
              price: 424,
              image: 'https://code.s3.yandex.net/react/code/meat-01.png',
              image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
              image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
            }
          ]
        }
      },
      deleteIngredient(tabIngredient)
    );

    const {constructorItems, bun} = newState;

    expect(constructorItems.ingredients.length === 0);
  });

  test('Перемещение: placeIngredientUp', () => {
    const newState = constructorSlice.reducer(
      {
        bun: null,
        constructorItems: {
          bun: {
            price: 0
          },
          ingredients: constructorIngredients
        }
      },
      placeIngredientUp(tabIngredientToMove)
    );

    const {constructorItems, bun} = newState;

    expect(constructorItems.ingredients === constructorIngredientsAfter);
  });

  test('Перемещение: placeIngredientDown', () => {
    const newState = constructorSlice.reducer(
      {
        bun: null,
        constructorItems: {
          bun: {
            price: 0
          },
          ingredients: constructorIngredientsAfter
        }
      },
      placeIngredientDown(tabIngredientToMove)
    );

    const {constructorItems, bun} = newState;

    expect(constructorItems.ingredients === constructorIngredients);
  })

  test('Очистка конструктора: clearAll', () => {
    const newState = constructorSlice.reducer(
      {
        bun: bunIngredient,
        constructorItems: {
          bun: {
            price: 1255
          },
          ingredients: constructorIngredients
        }
      },
      clearAll()
    );

    const {constructorItems, bun} = newState;

    expect(bun === null);
    expect(constructorItems.ingredients).toEqual([]);
  })
})


//dsagf
