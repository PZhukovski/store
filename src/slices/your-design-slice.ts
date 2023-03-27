import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";
import { ApplicationState } from "../store";
import { SectionType } from "../types/products";

export const fetchYourDesign = createAsyncThunk("your_design",
async (payload, { dispatch, rejectWithValue }) => {
  try {
    const response = await axios.get("http://qa-games.ru/astore/your-design")
    return response
  } catch (err : any) {
    if (!err.response) {
      throw new Error("Can't axios")
    }
    return rejectWithValue(err.response)
  }
});

const yourDesignAdapter = createEntityAdapter<SectionType>();

const initialState = yourDesignAdapter.getInitialState({
  loading: false,
  error: false,
});

const madeInAlfaSlice = createSlice({
  name: "yourDesign",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchYourDesign.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchYourDesign.fulfilled, (state, action) => {
        state.loading = false;
        yourDesignAdapter.addMany(state, action.payload.data);
      })
      .addCase(fetchYourDesign.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addDefaultCase(() => {});
  },
});
const { actions, reducer } = madeInAlfaSlice;

export default reducer;

export const { selectAll: yourDesign } = yourDesignAdapter.getSelectors((state: ApplicationState) => state.yourDesign);