import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TConstructorItems, TUser } from '@utils-types';

import { TOrder } from '@utils-types';

import { orderBurgerApi } from '../utils/burger-api';

export const newOrder = createAsyncThunk('order/newOrder', orderBurgerApi);

export interface TNewOrderState {
  orderRequest: boolean;
  orderModalData: TOrder | null;
  error: string | undefined;
  constructorItems: TConstructorItems;
}

export const initialState: TNewOrderState = {
  orderRequest: false,
  orderModalData: null,
  error: undefined,
  constructorItems: {
    bun: {
      price: 0
    },
    ingredients: []
  }
};

export const newOrderSlice = createSlice({
  name: 'newOrder',
  initialState,
  reducers: {
    closeOrderRequest(state) {
      state.orderRequest = false;
      state.orderModalData = null;
    }
  },
  selectors: {
    selectOrderRequest: (state) => state.orderRequest,
    selectOrderModalData: (state) => state.orderModalData
  },
  extraReducers: (builder) => {
    builder.addCase(newOrder.pending, (state) => {
      state.orderRequest = true;
    });
    builder.addCase(newOrder.fulfilled, (state, action) => {
      state.orderRequest = false;
      state.orderModalData = action.payload.order;
    });
    builder.addCase(newOrder.rejected, (state, action) => {
      state.error = action.error.message;
    });
  }
});

export const { closeOrderRequest } = newOrderSlice.actions;
export const { selectOrderModalData, selectOrderRequest } =
  newOrderSlice.selectors;
