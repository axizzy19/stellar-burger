import { configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { constructorSlice } from '../slices/constructorSlice';
import { feedsSlice } from '../slices/feedsSlice';
import { ingredientsSlice } from '../slices/ingredientsSlice';
import { newOrderSlice } from '../slices/newOrderSlice';
import { userOrdersSlice } from '../slices/userOrdersSlice';
import { userSlice } from '../slices/userSlice';
import { rootReducer } from './rootReducer';

//const rootReducer = () => {}; // Заменить на импорт настоящего редьюсера

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useAppSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
