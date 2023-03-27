import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import { fetchMadeInAlfa, madeInAlfa } from '../../slices/made-in-alfa-slice';
import { useTypeSelector } from '../../hooks/use-type-selector';
import { Typography } from "@alfalab/core-components/typography";
import { Gap } from "@alfalab/core-components/gap";
import { Grid } from "@alfalab/core-components/grid";
import styles from "./madeinalfa.module.css";
import { CardPreview } from "../card-preview";
import { ErrorBoundary } from "../../error-boundary";
import { useAppDispatch } from '../../store';


export const MadeInAlfa = () => {

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchMadeInAlfa())
  }, []);

  const items = useTypeSelector(madeInAlfa)

  return (
    <>
      <Gap size="xl" />
      <Typography.TitleResponsive view="xlarge" font="styrene" tag="h1">
        Сделано в Альфе
      </Typography.TitleResponsive>
      <Gap size="xl" />
      <Typography.TitleResponsive view="small" font="styrene" tag="h3">
        Хотим каждую из этих вещей! Себе, родным и друзьям
      </Typography.TitleResponsive>
      <Gap size="6xl" />
      <Grid.Row justify="left" align="top">
      <ErrorBoundary>
        {items.map((item) => {
          return (
            <Grid.Col width={{ mobile: 6, tablet: 4, desktop: 4 }}>
              <Link
                to={`/sdelano-v-alfe/${item.id}`}
                key={item.id}
                className={styles.link}
                >
                <CardPreview key={item.id} product={item} />
              </Link>
            </Grid.Col>
          );
        })}
         </ErrorBoundary>
      </Grid.Row>
    </>
  );
};

