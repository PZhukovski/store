import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createOrder, clearCart } from "../../slices/cart-slice";
import { useTypeSelector } from "../../hooks/use-type-selector";
import { Typography } from "@alfalab/core-components/typography";
import { Gap } from "@alfalab/core-components/gap";
import { Product } from "../product";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input } from "@alfalab/core-components/input";
import { RadioGroup } from "@alfalab/core-components/radio-group";
import { Radio } from "@alfalab/core-components/radio";
import { PhoneInput } from "@alfalab/core-components/phone-input";
import { Checkbox } from "@alfalab/core-components/checkbox";
import { Textarea } from "@alfalab/core-components/textarea";
import { isEmpty } from "lodash";
import { v1 } from "uuid";
import styles from "./cart.module.css";
var store = require('store')

const schema = yup
  .object({
    firstName: yup
      .string()
      .required("Пожалуйста, заполните все обязательные поля"),
    email: yup
      .string()
      .email()
      .required("Пожалуйста, заполните все обязательные поля"),
    phone: yup
      .string()
      .required("Пожалуйста, заполните все обязательные поля")
      .min(16, "Некорректный номер"),
    adress: yup
      .string()
      .required("Пожалуйста, заполните все обязательные поля"),
    delivery: yup
      .string()
      .required("Пожалуйста, заполните все обязательные поля"),
    promocode: yup.string(),
    agreement: yup
      .boolean()
      .oneOf([true])
      .required("Пожалуйста, заполните все обязательные поля"),
    comment: yup.string(),
    payment: yup
      .string()
      .required("Пожалуйста, заполните все обязательные поля"),
  })
  .required();
type FormData = yup.InferType<typeof schema>;

export const Cart = () => {
  const [delivery, setDelivery] = useState({
    price: 0,
    value: "",
  });
  const dispatch = useDispatch();
  const products = useTypeSelector((state) => state.cart.cart);
  const totalSum = useTypeSelector((state) => state.cart.totalSum);

  const {
    register,
    handleSubmit,
    control,
    reset,
    getValues,
    formState: { errors },
  } = useForm<FormData>({
    // @ts-ignore
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    const order = {
      id: v1(),
      name: v1(),
      email: data.email,
      phone: data.phone,
      address: data.adress,
      deliveryType: data.delivery,
      paymentType: data.payment,
      order_products: products,
      totalSum: totalSum + delivery.price,
    };
    dispatch(createOrder(order));
    dispatch(clearCart())
    store.remove('USER_CART')
    reset({
      "promocode":  undefined,
      "comment": undefined,
      "firstName": "",
      "email": "",
      "phone": "",
      "adress": "",
      "delivery": "",
      "agreement": false,
      "payment": "",
  })
  };

  const handleChangeDelivery =
    (data: { price: number; value: string }) => () => {
      setDelivery(data);
    };
  return (
    <div className={styles.block}>
      <Typography.Title
        className={styles.title}
        weight="bold"
        tag={"div"}
        view={"small"}>
        Ваш заказ
      </Typography.Title>
      <div className={styles.container}>
        <div className={styles.form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Typography.Text weight="bold">ФИО</Typography.Text>
            <Gap size="xs" />
            <Controller
              name="firstName"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  {...field}
                  block={true}
                  placeholder="ФИО"
                  size="m"
                  fieldClassName={errors.firstName ? styles.error_border : ""}
                />
              )}
            />
            <div className={styles.error}>{errors.firstName?.message}</div>
            <Gap size="m" />
            <Typography.Text weight="bold">E-Mail</Typography.Text>
            <Gap size="xs" />
            <Controller
              name="email"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  {...field}
                  block={true}
                  placeholder="example@site.ru"
                  size="m"
                  type="email"
                  fieldClassName={errors.email ? styles.error_border : ""}
                />
              )}
            />
            <div className={styles.error}>{errors.email?.message}</div>
            <Gap size="m" />
            <Typography.Text weight="bold">Телефон</Typography.Text>
            <Gap size="xs" />
            <Controller
              name="phone"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <PhoneInput
                  {...field}
                  block={true}
                  placeholder="+7 999 999-99-99"
                  size="m"
                  fieldClassName={errors.phone ? styles.error_border : ""}
                />
              )}
            />
            <div className={styles.error}>{errors.phone?.message}</div>
            <Gap size="m" />
            <Typography.Text weight="bold">
              Адрес (если вы выбрали самовывоз — оставьте поле пустым)
            </Typography.Text>
            <Gap size="xs" />
            <Controller
              name="adress"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  {...field}
                  block={true}
                  placeholder="Индекс, город, улица, дом, квартира"
                  size="m"
                  fieldClassName={errors.adress ? styles.error_border : ""}
                />
              )}
            />
            <div className={styles.error}>{errors.adress?.message}</div>
            <Gap size="m" />
            <Typography.Text weight="bold">Доставка</Typography.Text>
            <Gap size="xs" />
            <Controller
              name="delivery"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <RadioGroup
                  {...field}
                  className={errors.delivery ? styles.error_border : ""}>
                  <Radio
                    label="Доставка по России — 350₽"
                    value="Доставка по России — 350₽"
                    size="m"
                    onClick={handleChangeDelivery({
                      price: 350,
                      value: "Доставка по России — 350₽",
                    })}
                  />
                  <Radio
                    label="Курьером по Москве — 300₽"
                    value="Курьером по Москве — 300₽"
                    size="m"
                    onClick={handleChangeDelivery({
                      price: 300,
                      value: "Курьером по Москве — 300₽",
                    })}
                  />
                  <Radio
                    label="Самовывоз (пр-т Андропова, 18 корп. 3)"
                    value="Самовывоз (пр-т Андропова, 18 корп. 3)"
                    size="m"
                    onClick={handleChangeDelivery({
                      price: 0,
                      value: "Самовывоз (пр-т Андропова, 18 корп. 3)",
                    })}
                  />
                </RadioGroup>
              )}
            />
            <div className={styles.error}>{errors.delivery?.message}</div>
            <Gap size="m" />
            <Typography.Text weight="bold">Промокод</Typography.Text>
            <Gap size="xs" />
            <Controller
              name="promocode"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  {...field}
                  block={true}
                  size="m"
                  fieldClassName={errors.promocode ? styles.error_border : ""}
                />
              )}
            />
            <div className={styles.error}>{errors.promocode?.message}</div>
            <Gap size="m" />
            <Controller
              name="agreement"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                // @ts-ignore
                <Checkbox
                  {...field}
                  block={true}
                  size="m"
                  className={errors.agreement ? styles.error_border : ""}
                  label="Согласен с политикой конфиденциальности и обработки персональных данных"
                  checked={field.value === true ? true : false}
                />
              )}
            />
            <div className={styles.error}>{errors.agreement?.message}</div>
            <Gap size="m" />
            <Typography.Text weight="bold">
              Комментарий к заказу
            </Typography.Text>
            <Gap size="xs" />
            <Controller
              name="comment"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Textarea
                  {...field}
                  block={true}
                  size="l"
                  fieldClassName={errors.comment ? styles.error_border : ""}
                />
              )}
            />
            <div className={styles.error}>{errors.comment?.message}</div>
            <Gap size="l" />
            <Typography.Text>
              Выберите способ оплаты «Промокод», если ваш заказ не превышает
              сумму промокода. Если больше — выберите оплату картой.
            </Typography.Text>
            <Gap size="m" />
            <Typography.Text weight="bold">Способ оплаты</Typography.Text>
            <Gap size="xs" />
            <Controller
              name="payment"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <RadioGroup
                  {...field}
                  className={errors.payment ? styles.error_border : ""}>
                  <Radio
                    label="Банковская карта"
                    value="Банковская карта"
                    size="m"
                  />
                  <Radio label="Промокод" value="Промокод" size="m" />
                </RadioGroup>
              )}
            />
            <div className={styles.error}>{errors.payment?.message}</div>
            {isEmpty(errors) ? (
              ""
            ) : (
              <>
                <Gap size="xl" />
                <div className={styles.alert}>
                  <div>Пожалуйста, заполните все обязательные поля</div>
                </div>
              </>
            )}

            <Gap size="l" />
            <button type="submit" className={styles.button}>
              Дальше
            </button>
          </form>
        </div>
        <div className={styles.cart}>
          <div className={styles.products}>
            {products.map((product) => {
              return <Product key={product.id} product={product} />;
            })}
          </div>
          <Gap size="l" />
          <Typography.Text weight="bold">Сумма: {totalSum} ₽</Typography.Text>
          <Gap size="xs" />
          <Typography.Text>{delivery.value}</Typography.Text>
          <Gap size="xs" />
          <Typography.Text weight="bold">
            Итоговая сумма: {totalSum + delivery.price} ₽
          </Typography.Text>
          <Gap size="xl" />
        </div>
      </div>
    </div>
  );
};
