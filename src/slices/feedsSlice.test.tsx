
import { configureStore } from "@reduxjs/toolkit";
import { feedsSlice, getAllFeeds, initialState, selectOrdersFeeds, selectTodayOrders, selectTotalOrders } from "./feedsSlice";
import { feedsMockData } from "./testData";

describe('Тесты feedsSlice: селекторы', () => {
  test('Селекторы selectOrdersFeeds, selectTotalOrders, selectTodayOrders', () => {
    const store = configureStore({
      reducer: {
        feeds: feedsSlice.reducer
      },
      preloadedState: {
        feeds: feedsMockData
      }
    });
    const orders = selectOrdersFeeds(store.getState());
    const total = selectTotalOrders(store.getState());
    const totalToday = selectTodayOrders(store.getState());
    expect(orders).toEqual(feedsMockData.orders);
    expect(total).toEqual(feedsMockData.totalOrders);
    expect(totalToday).toEqual(feedsMockData.ordersToday);
  })
})

describe('Тесты feedsSlice: асинхронные экшены', () => {
  test('Экшен getAllFeeds: fulfilled', () => {
    const action = {
      type: getAllFeeds.fulfilled.type,
      payload: feedsMockData
    };

    const receivedData = feedsSlice.reducer(initialState, action);
    
    expect(receivedData.ordersToday === feedsMockData.ordersToday)
    expect(receivedData.totalOrders === feedsMockData.totalOrders);
    expect(receivedData.loading === false);
    expect(receivedData.errorText === "");
  })

  test('Экшен getAllFeeds: rejected', () => {
    const state = feedsSlice.reducer(
      initialState,
      getAllFeeds.rejected(new Error('error'), 'Ошибка тестирования')
    );

    expect(state.orders).toEqual([]);
    expect(state.errorText === 'Ошибка тестирования');
    expect(state.loading === false);
    expect(state.orders).toEqual([]);
    expect(state.totalOrders === 0);
    expect(state.ordersToday === 0);
  })

  test('Экшен getAllFeeds: pending', () => {
    const state =feedsSlice.reducer(
      initialState,
      getAllFeeds.pending('')
    );

    expect(state.loading === true);
    expect(state.errorText === undefined);
  })
})

// asd
