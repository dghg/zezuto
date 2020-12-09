import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Place } from '../util/types';
import { getMap, mapMarkerinMap } from '../util/f';
const Map = styled.div`
  width: 100%;
  height: 300px; 
`

interface Props {
  places: Place[];
}

const MapContainer: React.FunctionComponent<Props> = ({places}) => {
  useEffect(()=> {
    const map = getMap(document.getElementById("map")); // map  생성
    places.forEach((place) => {
      mapMarkerinMap(map, place);
    });
  });
  
  return (
    <Map id="map" />
  )
};

export default React.memo(MapContainer);