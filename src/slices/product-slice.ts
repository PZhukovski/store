import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";
import { ApplicationState } from "../store";
import { ProductType } from "../types/products";


export const fetchProduct = createAsyncThunk(
  "product",
  async (id: number, {dispatch,  rejectWithValue } : any) => {
    try {
      const response = await axios.get(`http://qa-games.ru/astore/product/${id}`)
      return response
    } catch (err : any) {
      if (!err.response) {
        throw new Error("Can't axios")
      }
      return rejectWithValue(err.response)
        }
      }
);

const productAdapter = createEntityAdapter<ProductType>();

const initialState = productAdapter.getInitialState({
  loading: false,
  error: false,
});

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.loading = true;
        state.entities = {};
        state.ids = [];
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.loading = false;
        productAdapter.addOne(state, action.payload.data);
      })
      .addCase(fetchProduct.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addDefaultCase(() => {});
  },
});
const { actions, reducer } = productSlice;

export default reducer;

export const { selectAll: product } = productAdapter.getSelectors(
  (state: ApplicationState) => state.product
);
