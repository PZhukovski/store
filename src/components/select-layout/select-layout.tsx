import React from "react";
import { Typography } from "@alfalab/core-components/typography";
import { Gap } from "@alfalab/core-components/gap";
import { Controller, Control } from "react-hook-form";
import {
  BaseOption,
  Select,
} from "@alfalab/core-components/select";

type SelectLayoutPropsType = {
  title: string;
  name: "size" | "color" | "sticker";
  control: Control<{
    size:  string | undefined;
    color:  string | undefined;
    sticker: number | undefined;
}>;
  entity: string[] | undefined | number[] | never[];
};

export const SelectLayout = ({
  title,
  name,
  control,
  entity,
}: SelectLayoutPropsType) => {

  const optionsEntity = entity?.map((item, index) => {
    return {
      key: index,
      content: item,
    };
  });
  return (
    <>
      {entity && (
        <>
          <Gap size="m" />
          <Typography.Text tag="div" weight="medium" view="secondary-small">
            {title}
          </Typography.Text>
          <Gap size="xs" />

          <Controller
            name={name}
            control={control}
            rules={{ required: true }}
            render={({ field}) => (
              <Select
                {...field}
                allowUnselect={true}
                size="s"
                // @ts-ignore
                options={optionsEntity}
                // @ts-ignore
                placeholder={"Выберите..."}
                Option={BaseOption}
                block={true}
              />
            )}
          />
        </>
      )}
    </>
  );
};
