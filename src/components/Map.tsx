import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Place } from '../types';

const Map = styled.div`
  width: 100%;
  height: 300px; 
`
const { kakao } = window;
const mapOptions = (x: number, y: number) => {
    return {
      center: new kakao.maps.LatLng(x, y),
      level: 10
    }
};

interface Props {
  places: Place[];
}

const MapContainer: React.FunctionComponent<Props> = ({places}) => {
  useEffect(()=> {
    const options = mapOptions(33.4563, 126.3478);
    const map = new kakao.maps.Map(document.getElementById("map"), options); // map  생성
    places.forEach((place) => {
      const position = new kakao.maps.LatLng(place.x, place.y);
      const marker = new kakao.maps.Marker({
        map,
        position,
      });
      const window = new kakao.maps.InfoWindow({
        position,
        content: `${place.desc} - ${place.writer}`
      });
      kakao.maps.event.addListener(marker, "mouseover", ()=> {window.open(map, marker)});
      kakao.maps.event.addListener(marker, "mouseout", () => {window.close()});
    });
  }); 
  return (
    <Map id="map" />
  )
};

export default MapContainer;