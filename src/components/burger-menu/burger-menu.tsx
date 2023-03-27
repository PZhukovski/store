import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import classNames from "classnames";
import { links } from "./links";
import { ReactComponent as ReactCancelWhite  } from "../../assets/cancelwhite.svg";
import { ReactComponent as ReactCancelBlack  } from "../../assets/cancelblack.svg";
import { ReactComponent as ReactSocialMailWhite } from "../../assets/socialmailwhite.svg";
import { ReactComponent as ReactSocialMailBlack } from "../../assets/socialmailblack.svg";
import { ReactComponent as ReactSocialPhoneWhite } from "../../assets/socialphonewhite.svg";
import { ReactComponent as ReactSocialPhoneBlack } from "../../assets/socialphoneblack.svg";
import { ReactComponent as ReactNetworkWhite } from "../../assets/socialnetworkwhite.svg";
import { ReactComponent as ReactNetworkBlack } from "../../assets/socialnetworkblack.svg";

import styles from "./burgermenu.module.css";

type MenuPropsType = {
  isActiveModal: boolean;
  handleBurgerMenu: () => void;
};

export const BurgerMenu = ({ isActiveModal, handleBurgerMenu }: MenuPropsType) => {
  const { pathname } = useLocation();
  const [activeLink, setActiveLink] = useState(pathname);
  const [windowDimensions, setWindowDimensions] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleResize = () => {
    setWindowDimensions(window.innerWidth);
  };
  const handleActive = (link: string) => () => {
    setActiveLink(link);
  };
  const activeWrapperStyle = classNames(styles.wrapper, {
    [styles.wrapperShow]: isActiveModal === true,
  });
  const activeMenuStyle = classNames(styles.menu, {
    [styles.menuShow]: isActiveModal === true,
  });
  return (
    <>
      <div className={activeWrapperStyle}>
        <div className={styles.overlay}></div>
      </div>
      <div className={activeMenuStyle}>
        <button className={styles.button} onClick={handleBurgerMenu}>
          {windowDimensions > 980 ? (
            <ReactCancelWhite className={styles.buttonImg}/>
          ) : (
            <ReactCancelBlack className={styles.buttonImg}/>
          )}
        </button>
        <div className={styles.container}>
          <div className={styles.logo}>A-Store</div>
          <ul className={styles.links}>
            {links.map((link) => {
              const activeLinkStyle = classNames(styles.link, {
                [styles.activeLink]: activeLink === link.route,
              });
              return (
                <Link to={link.route} key={link.id}>
                  <li className={activeLinkStyle} onClick={handleActive(link.route)}>
                    {link.title}
                  </li>
                </Link>
              );
            })}
          </ul>
          <div className={styles.footer}>
            <div className={styles.policy}>
              <Link to={"/policy"}>
                Политика конфиденциальности и обработки персональных данных
              </Link>
            </div>
            <div className={styles.socialLinks}>
              <a
                href="mailto:info@alfabankstore.ru"
                target="_blank"
                rel="nofollow">
                {windowDimensions > 980 ? (
                  <ReactSocialMailWhite className={styles.socialImg}/>
                ) : (
                  <ReactSocialMailBlack className={styles.socialImg}/>
                )}
              </a>
              <a href="tel:+7 906 061-60-20" target="_blank" rel="nofollow">
                {windowDimensions > 980 ? (
                  <ReactSocialPhoneWhite className={styles.socialImg}/>
                ) : (
                  <ReactSocialPhoneBlack className={styles.socialImg}/>
                )}
              </a>
              <a
                href="https://wa.me/79060616020"
                target="_blank"
                rel="nofollow noopener">
                {windowDimensions > 980 ? (
                  <ReactNetworkWhite className={styles.socialImg}/>
                ) : (
                  <ReactNetworkBlack className={styles.socialImg}/>
                )}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

