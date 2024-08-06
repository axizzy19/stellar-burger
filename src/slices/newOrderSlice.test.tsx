import { configureStore } from "@reduxjs/toolkit";
import { closeOrderRequest, initialState, newOrder, newOrderSlice, selectOrderModalData, selectOrderRequest } from "./newOrderSlice";
import { newOrderMockData, orderMockData, orderNewMockData, tabIngredient } from "./testData"

describe('Тесты newOrderSlice: селекторы', () => {
  test('Селекторы selectOrderRequest, selectOrderModalData', () => {
    const store = configureStore({
      reducer: {
        newOrder: newOrderSlice.reducer
      },
      preloadedState: {
        newOrder: orderNewMockData
      }
    });
    const orderRequest = selectOrderRequest(store.getState());
    const modalData = selectOrderModalData(store.getState());
    expect(orderRequest).toEqual(orderNewMockData.orderRequest);
    expect(modalData).toEqual(orderNewMockData.orderModalData);
  })
})

describe('Тесты newOrderSlice: редьюсеры', () => {
  test('редьюсер: closeOrderRequest', () => {
    const newState = {
      orderRequest: true,
      orderModalData: orderMockData.order,
    };
    closeOrderRequest();
    
    expect(newState.orderRequest === false);
    expect(newState.orderModalData === null);
  })
})

describe('Тесты newOrderSlice: асинхронные экшены', () => {
  test('Экшен newOrder: fulfilled', () => {
    const state = newOrderSlice.reducer(
      initialState,
      newOrder.fulfilled(newOrderMockData, '', [''])
    )
    expect(state.orderRequest === false);
    expect(state.orderModalData === newOrderMockData.order);
  });

  test('Экшен newOrder: rejected', () => {
    const state = newOrderSlice.reducer(
      initialState,
      newOrder.rejected(new Error('error'), 'Ошибка тестирования', [''])
    );
    expect(state.error === 'Ошибка тестирования')
  });

  test('Экшен newOrder: pending', () => {
    const state = newOrderSlice.reducer(
      initialState,
      newOrder.pending('', [])
    );
    expect(state.orderRequest === true);
  })
})

// asd
