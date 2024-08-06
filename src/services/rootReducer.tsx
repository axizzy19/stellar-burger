import { combineReducers } from '@reduxjs/toolkit';
import { constructorSlice } from '../slices/constructorSlice';
import { feedsSlice } from '../slices/feedsSlice';
import { ingredientsSlice } from '../slices/ingredientsSlice';
import { newOrderSlice } from '../slices/newOrderSlice';
import { userOrdersSlice } from '../slices/userOrdersSlice';
import { userSlice } from '../slices/userSlice';

export const rootReducer = combineReducers({
  [ingredientsSlice.name]: ingredientsSlice.reducer,
  [constructorSlice.name]: constructorSlice.reducer,
  [userSlice.name]: userSlice.reducer,
  [feedsSlice.name]: feedsSlice.reducer,
  [newOrderSlice.name]: newOrderSlice.reducer,
  [userOrdersSlice.name]: userOrdersSlice.reducer
});
