import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";
import { ApplicationState } from "../store";
import { ProductPreviewType } from "../types/products";

type ItemsType = {
  items? : ProductPreviewType[]
}
export const fetchMadeInAlfa  = createAsyncThunk(
  'made_in_alfa',
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.get("http://qa-games.ru/astore/made-in-alfa")
      return response
    } catch (err : any) {
      if (!err.response) {
        throw new Error("Can't axios")
      }
      return rejectWithValue(err.response)
    }
  }
);

const madeInAlfaAdapter = createEntityAdapter<ProductPreviewType>();

const initialState = madeInAlfaAdapter.getInitialState({
  loading: false,
  error: false
});

const madeInAlfaSlice = createSlice({
  name: "madeInAlfa",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMadeInAlfa.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMadeInAlfa.fulfilled, (state, action) => {
        state.loading = false;
        madeInAlfaAdapter.addMany(state, action.payload.data);
      })
      .addCase(fetchMadeInAlfa.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addDefaultCase(() => {});
  },
});
const { actions, reducer } = madeInAlfaSlice;

export default reducer;

export const { selectAll: madeInAlfa } = madeInAlfaAdapter.getSelectors(
  (state: ApplicationState) => state.madeInAlfa
);
