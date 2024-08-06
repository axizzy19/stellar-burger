import { configureStore } from "@reduxjs/toolkit";
import { ordersMockData } from "./testData";
import { getUserOrders, initialState, selectOrders, userOrdersSlice } from "./userOrdersSlice";

describe('Тесты userOrdersSlice: селекторы', () => {
  test('Селектор selectOrders', () => {
    const store = configureStore({
      reducer: {
        orders: userOrdersSlice.reducer
      },
      preloadedState: {
        orders: ordersMockData
      }
    });
    const orders = selectOrders(store.getState());
    expect(orders).toEqual(ordersMockData.orders);
  })
})

describe('Тесты userOrdersSlice: асинхронные экшены', () => {
  test('Экшен getUserOrders: fulfilled', () => {
    const state = userOrdersSlice.reducer(
      initialState,
      getUserOrders.fulfilled(ordersMockData.orders, '')
    );
    expect(state.loading === false);
    expect(state.orders === ordersMockData.orders);
  });

  test('Экшен getUserOrders: rejected', () => {
    const state = userOrdersSlice.reducer(
      initialState,
      getUserOrders.rejected(new Error('error'), 'Ошибка тестирования')
    );
    expect(state.loading === false);
  });

  test('Экшен getUserOrders: pending', () => {
    const state = userOrdersSlice.reducer(
      initialState,
      getUserOrders.pending('')
    );
    expect(state.loading === true);
  })
})

// sdafg
