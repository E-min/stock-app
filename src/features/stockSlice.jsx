import { createSlice } from "@reduxjs/toolkit";

const stockSlice = createSlice({
  name: "stock",
  initialState: {
    loading: false,
    error: false,
    firms: [],
    brands: [],
    products: [],
    sales: [],
    purchases: [],
    categories: []
  },
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    fetchSuccess: (state, { payload }) => {
      state[payload.type] = payload.data;
      state.loading = false;
    },
    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const { fetchStart, fetchFail, fetchSuccess } = stockSlice.actions;
export default stockSlice.reducer;
