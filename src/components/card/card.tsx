import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProduct, product } from "../../slices/product-slice";
import { Typography } from "@alfalab/core-components/typography";
import { Gap } from "@alfalab/core-components/gap";
import { Button } from "@alfalab/core-components/button";
import { SelectLayout } from "../select-layout";
import { useTypeSelector } from "../../hooks/use-type-selector";
import { addToCart } from "../../slices/cart-slice";
import { useForm, SubmitHandler } from "react-hook-form";
import { v1 } from 'uuid';
import { useAppDispatch } from "../../store";
// @ts-ignore
import styles from "./card.module.css";

type HooksPropsType = {
    size:  string | undefined;
    color:  string | undefined;
    sticker: number | undefined;
};
export const Card = () => {

  const {id} = useParams();
  const idMemo = Number(id)
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProduct(idMemo))
  }, [idMemo]);

  const item = useTypeSelector(product)

  useEffect(() => {
   setActiveSlide(preview)

  }, [item]);

  const {
    preview,
    images,
    title,
    stickerNumbers,
    description,
    price,
    sizes,
    colors,
  } = item[0] || {};

  const [activeSlide, setActiveSlide] = useState(preview);

  const initialState : HooksPropsType = {
    size:  undefined,
    color:  undefined,
    sticker:  undefined
  };
  const { handleSubmit, control , reset} = useForm({defaultValues: initialState});
  const handleImageChange = (image: string) => () => {
    setActiveSlide(image);
  };

  const handleAddBusket : SubmitHandler<any>= (data) => {
    const {size, color, sticker} = data;
    const itemToBucket = {
      id: Number(id),
      title: title,
      color: color!==undefined ? color.selected.content : null,
      size: size!==undefined ? size.selected.content : null,
      stickerNumber: sticker!==undefined ? sticker.selected.content : null,
      preview: preview,
      price: price,
      quantity: 0,
      sum: price,
      removeId: v1()
    };
    dispatch(addToCart(itemToBucket))
    reset(initialState)
  };

  return (
    <>
      <div className={styles.block}>
        <div className={styles.slider_group}>
          <div className={styles.wrapper_image}>
            <div
              className={styles.image}
              style={{ backgroundImage: `url(${activeSlide})` }}></div>
            <div className={styles.images_gallery}>
              {images?.map((image, index) => {
                return (
                  <div
                    key={index}
                    onClick={handleImageChange(image)}
                    className={styles.image_small}
                    style={{ backgroundImage: `url(${image})` }}></div>
                );
              })}
            </div>
          </div>
        </div>
        <form onSubmit = {handleSubmit(handleAddBusket)}>
        <div className={styles.description}>
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
          <SelectLayout
            title={"размер"}
            name ={"size"}
            entity={sizes}
            control ={control}
          />
          <SelectLayout
            title={"цвет"}
            name ={"color"}
            entity={colors}
            control ={control}
          />
          <SelectLayout
            title={"номер стикера"}
            name ={"sticker"}
            entity={stickerNumbers}
            control ={control}
          />
          <Gap size="m" />
          <Button
            type ="submit"
            view="primary"
            size="xs">
            В корзину
          </Button>
          <Gap size="m" />
          <Typography.Text tag="div" weight="medium" view="secondary-medium">
            {description}
          </Typography.Text>
        </div>
        </form>
      </div>
    </>
  );
};


