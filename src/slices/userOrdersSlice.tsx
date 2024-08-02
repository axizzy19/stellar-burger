import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { TOrder } from '@utils-types';

import { getOrdersApi } from '@api';

export const getUserOrders = createAsyncThunk('user/orders', getOrdersApi);

export interface TOrdersState {
  orders: TOrder[];
  loading: boolean;
}

const initialState: TOrdersState = {
  orders: [],
  loading: true
};

export const userOrdersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  selectors: {
    selectOrders: (state) => state.orders
  },
  extraReducers: (builder) => {
    builder.addCase(getUserOrders.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUserOrders.fulfilled, (state, action) => {
      state.loading = false;
      state.orders = action.payload;
    });
    builder.addCase(getUserOrders.rejected, (state) => {
      state.loading = false;
    });
  }
});

export const { selectOrders } = userOrdersSlice.selectors;
