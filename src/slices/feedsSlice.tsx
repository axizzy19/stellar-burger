import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { TOrder } from '@utils-types';

import { getFeedsApi } from '../utils/burger-api';

export const getAllFeeds = createAsyncThunk('orders/getAll', getFeedsApi);

export interface TFeedsState {
  orders: TOrder[];
  totalOrders: number;
  ordersToday: number;
  loading: boolean;
  errorText: string | undefined;
}

export const initialState: TFeedsState = {
  orders: [],
  totalOrders: 0,
  ordersToday: 0,
  loading: true,
  errorText: ''
};

export const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  selectors: {
    selectOrdersFeeds: (state) => state.orders,
    selectTotalOrders: (state) => state.totalOrders,
    selectTodayOrders: (state) => state.ordersToday
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllFeeds.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.totalOrders = action.payload.total;
        state.ordersToday = action.payload.totalToday;
        state.loading = false;
      })
      .addCase(getAllFeeds.rejected, (state, action) => {
        state.orders = [];
        state.totalOrders = 0;
        state.ordersToday = 0;
        state.loading = false;
        state.errorText = action.error.message;
      })
      .addCase(getAllFeeds.pending, (state) => {
        state.loading = true;
        state.errorText = undefined;
      });
  }
});

export const { selectOrdersFeeds, selectTodayOrders, selectTotalOrders } =
  feedsSlice.selectors;
