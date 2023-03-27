import React from "react";
import { Footer } from "../footer";
import { Header } from "../header";
import styles from "./page.module.css";

type MainPropsType = {
  children: React.ReactNode;
};

export const Page = ({ children }: MainPropsType) => {
  return (
    <div className={styles.block}>
      <Header />
      {children}
      <Footer />
    </div>
  )
};

