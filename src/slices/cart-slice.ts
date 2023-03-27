import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";
import { OrderType } from "../types/products";

export const createOrder = createAsyncThunk("cart", async (data : {}) => {
  console.log(data);
  await axios
    .post("http://qa-games.ru/astore/create-order", data)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
});

const cartAdapter = createEntityAdapter();

const initialState = cartAdapter.getInitialState({
  cart: <OrderType[]>[],
  totalSum: 0,
  totalCount: 0,
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cart = [];
      state.totalCount = 0;
      state.totalSum = 0;
    },
    addLocalStorage: (state, action) => {
      state.cart.push(...action.payload);
      state.totalCount = state.cart.reduce(function (acc, obj) {
        return acc + obj.quantity;
      }, 0);
      state.totalSum = state.cart.reduce(function (acc, obj) {
        return acc + obj.sum;
      }, 0);
    },
    addToCart: (state, action) => {
      const itemInCart = state.cart.find(
        (item) =>
          item.id === action.payload.id &&
          item.color === action.payload.color &&
          item.size === action.payload.size &&
          item.stickerNumber === action.payload.stickerNumber
      );
      if (itemInCart) {
        itemInCart.quantity += 1;
        itemInCart.sum = itemInCart.price * itemInCart.quantity;
        state.totalSum = state.cart.reduce(function (acc, obj) {
          return acc + obj.sum;
        }, 0);
        state.totalCount = state.cart.reduce(function (acc, obj) {
          return acc + obj.quantity;
        }, 0);
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
        state.totalSum = state.cart.reduce(function (acc, obj) {
          return acc + obj.sum;
        }, 0);
        state.totalCount = state.cart.reduce(function (acc, obj) {
          return acc + obj.quantity;
        }, 0);
      }
    },
    incrementQuantity: (state, action) => {
      const item = state.cart.find(
        (item) =>
          item.id === action.payload.id &&
          item.color === action.payload.color &&
          item.size === action.payload.size &&
          item.stickerNumber === action.payload.stickerNumber
      );
      item!.quantity += 1;
      item!.sum = item!.price * item!.quantity;
      state.totalSum = state.cart.reduce(function (acc, obj) {
        return acc + obj.sum;
      }, 0);
      state.totalCount = state.cart.reduce(function (acc, obj) {
        return acc + obj.quantity;
      }, 0);
    },
    decrementQuantity: (state, action) => {
      const item = state.cart.find(
        (item) =>
          item.id === action.payload.id &&
          item.color === action.payload.color &&
          item.size === action.payload.size &&
          item.stickerNumber === action.payload.stickerNumber
      );
      if (item!.quantity === 1) {
        item!.quantity = 1;
      } else {
        item!.quantity--;
        item!.sum = item!.price * item!.quantity;
        state.totalSum = state.cart.reduce(function (acc, obj) {
          return acc + obj.sum;
        }, 0);
        state.totalCount = state.cart.reduce(function (acc, obj) {
          return acc + obj.quantity;
        }, 0);
      }
    },
    removeItem: (state, action) => {
      const removeItem = state.cart.filter(
        (item) => item.removeId !== action.payload
      );
      state.cart = removeItem;
      state.totalSum = state.cart.reduce(function (acc, obj) {
        return acc + obj.sum;
      }, 0);
      state.totalCount = state.cart.reduce(function (acc, obj) {
        return acc + obj.quantity;
      }, 0);
    },
  },
});
const { actions, reducer } = cartSlice;

export const { clearCart, addLocalStorage,  addToCart, incrementQuantity, decrementQuantity, removeItem } =
  actions;

export default reducer;
