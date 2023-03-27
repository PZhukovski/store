import React, { useState , useEffect} from "react";
import { useTypeSelector } from "../../hooks/use-type-selector";
import { addLocalStorage } from "../../slices/cart-slice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { SidePanelDesktop } from "@alfalab/core-components/side-panel/desktop";
import { Typography } from "@alfalab/core-components/typography";
import { Gap } from "@alfalab/core-components/gap";
import { Product } from "../product";
import styles from "./cartpanel.module.css";
var localStorage = require('store')

type CartPropsType = {
  open: boolean;
  handleCart: () => void;
};

export const CartPanel = ({ open, handleCart }: CartPropsType) => {
  const [state, setState] = useState({
    fixedСontent: "yes",
    header: "header",
    navigation: "closer",
    footerContent: "yes",
    placement: "right",
    scrollbar: "native",
  });

  const products = useTypeSelector((state) => state.cart.cart);
  const totalSum = useTypeSelector((state) => state.cart.totalSum);

  useEffect(() => {
    if (products.length > 0){
      localStorage.set('USER_CART', products)
    }
  }, [products]);
  
  return (
    <SidePanelDesktop
      className={styles.block}
      open={open}
      onClose={handleCart}
      size="s"
      placement="right"
      nativeScrollbar={state.scrollbar === "native"}>
      <SidePanelDesktop.Header
        className={styles.header}
        hasCloser={state.navigation === "closer"}
        sticky={state.fixedСontent === "yes"}
        title={"Ваш заказ"}
      />
      <SidePanelDesktop.Content className={styles.padding}>
        <div className={styles.products}>
          {products.map((product) => {
            return <Product key={product.id} product={product} />;
          })}
        </div>
        <Gap size="m" />
        <Typography.Text weight="bold">
          Итого: {totalSum} рублей
        </Typography.Text>
        <Gap size="m" />
        <Link to="/cart">
          <button className={styles.button} onClick={handleCart}>
            Продолжить
          </button>
        </Link>
      </SidePanelDesktop.Content>
    </SidePanelDesktop>
  );
};
