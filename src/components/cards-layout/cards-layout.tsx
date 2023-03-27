import React from "react";
import { Link } from "react-router-dom";
import { Grid } from "@alfalab/core-components/grid";
import { CardPreview } from "../card-preview";

import styles from "./cardslayout.module.css";


type CardsPropsType = {
  item: {
    id: number,
    preview: string,
    title: string,
    price: number,
    availability: boolean
  };
  link: string;
};

export const CardsLayout = ({ item, link }: CardsPropsType) => {
  return (
    <>
      <Grid.Col width={{ mobile: 6, tablet: 4, desktop: 4 }}>
        <Link to={`${link}/${item.id}`} key={item.id} className={styles.link}>
          <CardPreview key={item.id} product={item} />
        </Link>
      </Grid.Col>
    </>
  );
};
