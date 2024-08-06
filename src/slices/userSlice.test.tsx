import { configureStore } from "@reduxjs/toolkit";
import { userMockData, userRegisterData, userRegisterDataUpdated, userResponce, userResponceUpdated } from "./testData";
import { initialState, loginUser, logoutUser, registerUser, selectErrorText, selectIsAuthenticated, selectUser, updateUser, userApi, userSlice } from "./userSlice";

describe('Тесты userSlice: селекторы', () => {
  test('Селекторы selectIsAuthenticated, selectUser, selectErrorText', () => {
    const store = configureStore({
      reducer: {
        user: userSlice.reducer
      },
      preloadedState: {
        user: userMockData
      }
    })
    const isAuthenticated = selectIsAuthenticated(store.getState());
    const user = selectUser(store.getState());
    const error = selectErrorText(store.getState());
    expect(isAuthenticated).toEqual(userMockData.isAuthenticated);
    expect(user).toEqual(userMockData.user);
    expect(error).toEqual(userMockData.errorText);
  })
})

describe('Тесты userSlice: асинхронные экшены', () => {
  test('Экшен registerUser: fulfilled', () => {
    const action = {
      type: registerUser.fulfilled.type,
      payload: userResponce
    };
    const receivedData = userSlice.reducer(initialState, action);
    expect(receivedData.loading === false);
    expect(receivedData.isAuthenticated === true);
    expect(receivedData.user === userResponce.user);
    expect(receivedData.errorText === '');
  });

  test('Экшен registerUser: rejected', () => {
    const state = userSlice.reducer(
      initialState,
      registerUser.rejected(new Error('error'), 'Ошибка тестирования', userRegisterData)
    );
    expect(state.loading === false);
    expect(state.errorText === 'Ошибка тестирования')
  });

  test('Экшен registerUser: pending', () => {
    const state = userSlice.reducer(
      initialState,
      registerUser.pending('', userRegisterData)
    );
    expect(state.loading === true);
  })

  test('Экшен loginUser: fulfilled', () => {
    const action = {
      type: loginUser.fulfilled.type,
      payload: userResponce
    };
    const receivedData = userSlice.reducer(initialState, action);
    expect(receivedData.isAuthenticated === true);
    expect(receivedData.user === userResponce.user);
    expect(receivedData.errorText === '');
  });

  test('Экшен loginUser: rejected', () => {
    const state = userSlice.reducer(
      initialState,
      loginUser.rejected(new Error('error'), 'Ошибка тестирования', userRegisterData)
    );
    expect(state.loading === false);
    expect(state.errorText === 'Ошибка тестирования')
  });

  test('Экшен loginUser: pending', () => {
    const state = userSlice.reducer(
      initialState,
      loginUser.pending('', userRegisterData)
    );
    expect(state.loading === true);
    expect(state.errorText === "");
    expect(state.isAuthenticated === false);
  })

  test('Экшен userApi: fulfilled', () => {
    const action = {
      type: userApi.fulfilled.type,
      payload: userResponce
    };
    const receivedData = userSlice.reducer(initialState, action);
    expect(receivedData.isAuthenticated === true);
    expect(receivedData.user === userResponce.user);
    expect(receivedData.loading === false);
  });

  test('Экшен userApi: rejected', () => {
    const state = userSlice.reducer(
      initialState,
      userApi.rejected(new Error('error'), 'Ошибка тестирования')
    );
    expect(state.loading === false);
    expect(state.errorText === 'Ошибка тестирования');
    expect(state.isAuthenticated === false);
  });

  test('Экшен userApi: pending', () => {
    const state = userSlice.reducer(
      initialState,
      userApi.pending('')
    );
    expect(state.loading === true);
  })

  test('Экшен updateUser: fulfilled', () => {
    const action = {
      type: updateUser.fulfilled.type,
      payload: userResponceUpdated
    };
    const receivedData = userSlice.reducer(initialState, action);
    expect(receivedData.isAuthenticated === true);
    expect(receivedData.user === userResponceUpdated.user);
    expect(receivedData.loading === false);
  });

  test('Экшен updateUser: rejected', () => {
    const state = userSlice.reducer(
      initialState,
      updateUser.rejected(new Error('error'), 'Ошибка тестирования', userRegisterDataUpdated)
    );
    expect(state.loading === false);
    expect(state.errorText === 'Ошибка тестирования');
    expect(state.isAuthenticated === false);
  });

  test('Экшен updateUser: pending', () => {
    const state = userSlice.reducer(
      initialState,
      updateUser.pending('', userRegisterDataUpdated)
    );
    expect(state.loading === true);
    expect(state.errorText === '');
  })

  test('logoutUser: fulfilled', () => {
    const action = {
      type: logoutUser.fulfilled.type,
      payload: userResponce
    };
    const receivedData = userSlice.reducer(initialState, action);
    expect(receivedData.isAuthenticated === false);
    expect(receivedData.user === userResponceUpdated.user);
    expect(receivedData.loading === false);
  });

  test('Экшен logoutUser: pending', () => {
    const state = userSlice.reducer(
      initialState,
      logoutUser.pending('')
    );
    expect(state.loading === true);
  })
})

// adsf
