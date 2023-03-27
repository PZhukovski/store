import React from "react";
import { useDispatch } from "react-redux";
import {
  incrementQuantity,
  decrementQuantity,
  removeItem,
} from "../../slices/cart-slice";
import { Typography } from "@alfalab/core-components/typography";
import { IconButton } from "@alfalab/core-components/icon-button";
import { ReactComponent as ButtonPlus } from "../../assets/plus.svg";
import { ReactComponent as ButtonMinus } from "../../assets/minus.svg";
import { ReactComponent as ButtonDelete } from "../../assets/delete.svg";
import { OrderType } from "../../types/products";
import styles from "./product.module.css";

type ProductPropsType = {
  product: OrderType
};
export const Product = ({ product }: ProductPropsType) => {
  const dispatch = useDispatch();


  const handleAddCount = (product: OrderType) => () => {
    dispatch(incrementQuantity(product));
  };
  const handleRemoveCount = (product: OrderType) => () => {
    dispatch(decrementQuantity(product));
  };

  const handleRemoveProduct = (id: number) => () => {
    dispatch(removeItem(id));
  };

  return (
    <div className={styles.product}>
      <img src={product.preview} className={styles.img} />
      <div className={styles.description}>
        <Typography.Text weight="bold" tag="div">
          {product.title}
        </Typography.Text>
        {product.color ? (
          <Typography.Text tag="div">цвет: {product.color}</Typography.Text>
        ) : (
          ""
        )}
        {product.size ? (
          <Typography.Text tag="div">размер: {product.size}</Typography.Text>
        ) : (
          ""
        )}
        {product.stickerNumber ? (
          <Typography.Text tag="div">
            номер стикера: {product.stickerNumber}
          </Typography.Text>
        ) : (
          ""
        )}
      </div>
      <div className={styles.count}>
        <IconButton
          view="primary"
          size="xxs"
          icon={ButtonMinus}
          onClick={handleRemoveCount(product)}
        />
        <div className={styles.quantity}>{product.quantity}</div>
        <IconButton
          view="primary"
          size="xxs"
          icon={ButtonPlus}
          onClick={handleAddCount(product)}
        />
      </div>
      <div className={styles.price}>{product.sum} ₽</div>
      <div className={styles.remove}>
        <IconButton
          view="primary"
          size="xxs"
          icon={ButtonDelete}
          onClick={handleRemoveProduct(product.removeId)}
        />
      </div>
    </div>
  );
};
