import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useTypeSelector } from "../src/hooks/use-type-selector";
import { Page } from "./components/page";
import { Main } from "./components/main";
import { YourDesign } from "./components/your-design";
import { Card } from "./components/card"
import { MadeInAlfa } from "./components/made-in-alfa";
import { Contacts } from "./components/contacts";
import { ErrorBoundary } from "./error-boundary";
import { ButtonCart } from "./components/button-cart";
import { OrderType } from "./types/products";
import { Cart } from "./components/cart";
import { addLocalStorage } from "./slices/cart-slice";
import { useDispatch } from "react-redux";
var localStorage = require('store')

function App() {

  const products = useTypeSelector((state: { cart: { cart: OrderType[]; }; }) => state.cart.cart);
  const totalSum = useTypeSelector((state) => state.cart.totalSum);
  const dispatch = useDispatch();
  let cart =  localStorage.get('USER_CART')

  useEffect(() => {
    if (products.length === 0 &&  cart != undefined && cart != []) {
     dispatch(addLocalStorage(cart))
    }
   }, []);

   useEffect(() => {
    if (totalSum === 0 &&  cart != undefined && cart != []){
      localStorage.remove('USER_CART')
    }
  }, [totalSum]);

  return (
    <>
    <ErrorBoundary>
      <Router>
        <div className="App">
        { products.length > 0 &&
        <ButtonCart/>
        }
          <Routes>
            <Route path="/" element={<Page children={<Main/>}/>} />
            <Route path="/contact-us" element={<Page children={<Contacts/>}/>} />
            <Route path="/sdelano-v-alfe" element={<Page children={<MadeInAlfa/>}/>} />
            <Route path="/sdelano-v-alfe/:id" element={<Page children={<Card/>}/>} />
            <Route path="/svoy-dizain" element={<Page children={<YourDesign/>}/>} />
            <Route path="/svoy-dizain/:id" element={<Page children={<Card/>}/>}/>
            <Route path="/cart" element={<Page children={<Cart/>}/>} />
            <Route path="/policy" element ={''}/>
          </Routes>
        </div>
      </Router>
      </ErrorBoundary>
    </>
  );
}

export default App;
