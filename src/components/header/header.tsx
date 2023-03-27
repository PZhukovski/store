import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as ReactMenu } from "../../assets/menu.svg";
import { BurgerMenu } from "../burger-menu";
import styles from "./header.module.css";

export const Header = () => {
  const [isActiveModal, setIsActiveModal] = useState(false);

  const handleBurgerMenu = () => {
    setIsActiveModal(!isActiveModal);
  };
  return (
    <>
      <div className={styles.block}>
        <Link to={"/"} className={styles.link}>
          <div className={styles.logo}>A-Store</div>
        </Link>
        <div className={styles.menu} onClick={handleBurgerMenu}>
          <div className={styles.icon}>
            <ReactMenu/>
          </div>
          <div className={styles.href}>меню</div>
        </div>
      </div>
      <BurgerMenu
        isActiveModal={isActiveModal}
        handleBurgerMenu={handleBurgerMenu}
      />
    </>
  );
};
