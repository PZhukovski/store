import React, { useEffect } from "react";
import { fetchYourDesign, yourDesign } from "../../slices/your-design-slice";
import { useTypeSelector } from "../../hooks/use-type-selector";
import { Grid } from "@alfalab/core-components/grid";
import { TitleLayout } from "../title-layout";
import { CardsLayout } from "../cards-layout";
import { ErrorBoundary } from "../../error-boundary";
import { useAppDispatch } from "../../store";

export const YourDesign = () => {

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchYourDesign());
  }, []);
  const sections = useTypeSelector(yourDesign);

  return (
    <>
    <ErrorBoundary>
      {sections.map(({ title, description, products }) => {
        return (
          <>
            <TitleLayout
              title={title}
              description={description}
              color={"negative"}
            />
            <Grid.Row justify="left" align="top">
              {products.map((item) => {
                return (
                  <CardsLayout
                    key={item.id}
                    item={item}
                    link={"/svoy-dizain"}
                  />
                );
              })}
            </Grid.Row>
          </>
        );
      })}
       </ErrorBoundary>
    </>
  );
};
