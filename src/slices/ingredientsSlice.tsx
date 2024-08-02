import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { getIngredientsApi } from '@api';

export const getIngredientsList = createAsyncThunk(
  'ingredients/getIngredients',
  getIngredientsApi
);

type TIngredientsState = {
  ingredients: Array<TIngredient>;
  loading: boolean;
  error: string | null | undefined;
};

const initialState: TIngredientsState = {
  ingredients: [],
  loading: false,
  error: null
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    selectIngredients: (state) => state.ingredients,
    selectIngredientsLoading: (state) => state.loading,
    selectIngredientsState: (state) => state
  },
  extraReducers: (builder) => {
    builder.addCase(getIngredientsList.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getIngredientsList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getIngredientsList.fulfilled, (state, action) => {
      state.loading = false;
      state.ingredients = action.payload;
    });
  }
});

export const {
  selectIngredientsLoading,
  selectIngredients,
  selectIngredientsState
} = ingredientsSlice.selectors;
