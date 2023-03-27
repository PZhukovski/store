import React from "react";
import {
  YMaps,
  Map,
  Placemark,
  TypeSelector,
  ZoomControl,
} from "@pbe/react-yandex-maps";


export const MapYandex = () => {
  const defaultState = {
    center: [55.694431, 37.662284],
    zoom: 14,
    controls: [],
  };

  return (
    <YMaps>
      <Map defaultState={defaultState} width={578} height={300}>
        <Placemark geometry={[55.694431, 37.662284]} />
        <TypeSelector />
        <ZoomControl />
      </Map>
    </YMaps>
  );
}
