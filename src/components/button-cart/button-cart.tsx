import React, { useState , useEffect} from "react";
import { useLocation } from "react-router-dom";
import { useTypeSelector } from "../../hooks/use-type-selector";
import { Circle } from "@alfalab/core-components/icon-view/circle";
import { Badge } from "@alfalab/core-components/badge";
import { ReactComponent as ReactCart } from "../../assets/bag.svg";
import { CartPanel } from "../cart-panel";
import classNames from "classnames";
import styles from "./buttoncart.module.css";


export const ButtonCart = () => {
  
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(true)
  const [isOpenModal, setIsOpenModal] = useState(false);
  const totalCount = useTypeSelector((state) => state.cart.totalCount);


  useEffect(() => {
    pathname === '/cart' ? setIsOpen(false) : setIsOpen(true)
  }, [pathname]);

  const activeMenuStyle = classNames(styles.button, {
    [styles.button_hide]: isOpen === false,
  });
  const handleCart = () => {
    setIsOpenModal(!isOpenModal);
  };

  return (
    <>
      <div className={activeMenuStyle} onClick={handleCart}>
        <Circle
          size={80}
          backgroundColor="#ef3124"
          border={true}
          bottomAddons={
            <Badge view="count" iconColor="positive" height={24} content={totalCount} />
          }>
          <ReactCart />
        </Circle>
      </div>
      <CartPanel open={isOpenModal} handleCart ={handleCart}/>
    </>
  );
};
