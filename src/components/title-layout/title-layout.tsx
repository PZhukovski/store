import React from "react";
import { Typography } from "@alfalab/core-components/typography";
import { Gap } from "@alfalab/core-components/gap";


type TitleLayoutPropsType = {
  title: string;
  description: string
  color: "primary" | "negative"
};

export const TitleLayout = ({title, description, color}: TitleLayoutPropsType  ) => {
  return (
    <>
      <Gap size="xl" />
      <Typography.TitleResponsive view="xlarge" font="styrene" tag="h1" color={color}>
        {title}
      </Typography.TitleResponsive>
      <Gap size="xl" />
      <Typography.TitleResponsive view="small" font="styrene" tag="h3">
        {description}
      </Typography.TitleResponsive>
      <Gap size="6xl" />
    </>
  );
};
