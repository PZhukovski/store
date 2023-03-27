import React from "react";
import { Link } from "react-router-dom";
import svoy_dizain from "../../assets/svoy_dizain.jpeg";
import sdelano_v_alfe from "../../assets/sdelano_v_alfe.jpeg";
import styles from "./main.module.css";

export const Main = () => {
  return (
    <div className={styles.block}>
      <div className={styles.route}>
        <div className = {styles.title}>Сделано в Альфе</div>
        <Link to={"/sdelano-v-alfe"}>
          <img src={sdelano_v_alfe}/>
        </Link>
      </div>
      <div className={styles.route}>
      <div className = {styles.title}>Свой дизайн</div>
        <Link to={"/svoy-dizain"}>
          <img src={svoy_dizain}/>
        </Link>
      </div>
    </div>
  );
};

