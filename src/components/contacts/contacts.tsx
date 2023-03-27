import React from "react";
import { Typography } from "@alfalab/core-components/typography";
import { Gap } from "@alfalab/core-components/gap";
import { MapYandex } from "../map-yandex";
import { Grid } from "@alfalab/core-components/grid";

export const Contacts = () => {
  return (
    <>
      <Gap size="xl" />
      <Typography.TitleResponsive view="xlarge" font="styrene" tag="h1">
        Контакты
      </Typography.TitleResponsive>
      <Gap size="xl" />
      <Gap size="m" />
      <Grid.Row align="middle" justify="around">
        <div>
          <Typography.Text tag="div" weight="medium" view="secondary-medium">
            Телефон: +7 906 061 60 20
          </Typography.Text>
          <Typography.Text tag="div" weight="medium" view="secondary-medium">
            Почта: info@alfabankstore.ru
          </Typography.Text>
          <Gap size="m" />
          <Typography.Text tag="div" weight="medium" view="secondary-medium">
            Адрес: г. Москва, пр-т Андропова, 18 корп. 3
          </Typography.Text>
          <Gap size="m" />
          <Typography.Text tag="div" weight="medium" view="secondary-medium">
            Часы работы:
          </Typography.Text>
          <Typography.Text tag="div" weight="medium" view="secondary-medium">
            пн-чт: 10:00—19:00
          </Typography.Text>
          <Typography.Text tag="div" weight="medium" view="secondary-medium">
            пт: 10:00—17:30
          </Typography.Text>
          <Gap size="m" />
          <Typography.Text tag="div" weight="medium" view="secondary-medium">
            Принимаем к оплате карты Visa, Mastercard, МИР.
          </Typography.Text>
          <Gap size="xl" />
        </div>
        <MapYandex />
      </Grid.Row>
    </>
  );
};
