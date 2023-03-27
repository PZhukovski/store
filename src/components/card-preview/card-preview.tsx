import React from "react";
import { Typography } from "@alfalab/core-components/typography";
import { Gap } from "@alfalab/core-components/gap";
import { ProductPreviewType } from "../../types/products";

import styles from "./cardpreview.module.css";

type MadeInAlfaPropsType = {
  product: ProductPreviewType;
};

export const CardPreview = ({ product }: MadeInAlfaPropsType) => {
  const { preview, title, price } = product;

  return (
    <div className={styles.block}>
      <div className={styles.wrapper_image}>
        <div
          className={styles.image}
          style={{ backgroundImage: `url(${preview})` }}></div>
      </div>
      <Gap size="m" />
      <Typography.TitleResponsive view="small" font="styrene" tag="h4">
        {title}
      </Typography.TitleResponsive>
      <Gap size="m" />
      <Typography.TitleResponsive
        view="small"
        font="styrene"
        weight="bold"
        tag="h4">
        {price} ₽
      </Typography.TitleResponsive>
    </div>
  );
};
