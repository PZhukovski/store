import {configureStore} from '@reduxjs/toolkit' ;
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import madeInAlfa from '../slices/made-in-alfa-slice'
import  yourDesign  from '../slices/your-design-slice';
import  product  from '../slices/product-slice';
import  cart  from '../slices/cart-slice';
import {ThunkDispatch} from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {
      madeInAlfa, yourDesign, product, cart
    },
    middleware: (getDefaultMiddleware: () => any) => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== 'production',

})

export type ApplicationState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<ThunkDispatch<any, any, any>>();
// export const useAppDispatch = () => useDispatch<typeof store.dispatch>()
export const useAppSelector: TypedUseSelectorHook<ApplicationState> = useSelector;
