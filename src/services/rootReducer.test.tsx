import { configureStore } from "@reduxjs/toolkit"
import { rootReducer } from "./rootReducer"

describe('Тест rootReducer', () => {
  test('Проверка работы rootReducer', () => {
    const store = configureStore({
      reducer: rootReducer
    });

    const action = { type: 'UNKNOWN_ACTION' };
    const testState = rootReducer(undefined, action);
    expect(testState).toEqual(store.getState());
  })
})

// sdaf
