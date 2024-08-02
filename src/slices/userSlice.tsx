import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { TUser } from '@utils-types';
import {
  registerUserApi,
  loginUserApi,
  getUserApi,
  updateUserApi,
  logoutApi,
  TRegisterData,
  TLoginData
} from '@api';

export const registerUser = createAsyncThunk(
  'user/register',
  async (data: TRegisterData) => registerUserApi(data)
);

export const loginUser = createAsyncThunk(
  'user/login',
  async (data: TLoginData) => loginUserApi(data)
);

export const userApi = createAsyncThunk('user/get', async () => getUserApi());

export const updateUser = createAsyncThunk(
  'user/update',
  async (user: Partial<TRegisterData>) => updateUserApi(user)
);

export const logoutUser = createAsyncThunk('user/logout', async () =>
  logoutApi()
);

export interface TUserState {
  isAuthenticated: boolean;
  user: TUser;
  errorText: string | undefined;
  loading: boolean;
}

const initialState: TUserState = {
  isAuthenticated: false,
  user: {
    email: '',
    name: ''
  },
  errorText: '',
  loading: false
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  selectors: {
    selectIsAuthenticated: (state) => state.isAuthenticated,
    selectUser: (state) => state.user,
    selectErrorText: (state) => state.errorText
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.errorText = '';
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.errorText = action.error.message!;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      });
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.errorText = '';
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.errorText = action.error.message!;
      })
      .addCase(loginUser.pending, (state) => {
        state.isAuthenticated = false;
        state.errorText = '';
        state.loading = true;
      });
    builder
      .addCase(userApi.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.loading = false;
      })
      .addCase(userApi.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.errorText = action.error.message!;
        state.loading = false;
      })
      .addCase(userApi.pending, (state) => {
        state.loading = true;
      });
    builder
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.loading = false;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.errorText = action.error.message!;
        state.loading = false;
      })
      .addCase(updateUser.pending, (state) => {
        state.errorText = '';
        state.loading = true;
      });
    builder
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = { email: '', name: '' };
        state.loading = false;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      });
  }
});

export const { selectIsAuthenticated, selectErrorText, selectUser } =
  userSlice.selectors;
