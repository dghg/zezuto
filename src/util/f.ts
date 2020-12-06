import {STANDARD_LOCATION as st} from './constants';
import { Place } from './types';
const { kakao } = window;

function getDistanceFromLatLonInKm(lat1: number,lon1: number,lat2: number,lon2: number) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg: number) {
  return deg * (Math.PI/180)
}

  
export const checkDistance: (val: any) => boolean = (val) => {
    const d = getDistanceFromLatLonInKm(st.y, st.x, val.x, val.y);
    console.log(d);
    return d < 100 ? true : false;
};

export const getMap = (element: HTMLElement | null) => {
  const mapOptions = {
    center: new kakao.maps.LatLng(st.x, st.y),
    level: 10
  };

  return new kakao.maps.Map(element, mapOptions); // map  생성
}

export const mapMarkerinMap = (map: any, place: Place) => {
  const position = new kakao.maps.LatLng(place.x, place.y);
  const marker = new kakao.maps.Marker({
    map,
    position,
  });
  const window = new kakao.maps.InfoWindow({
    position,
    content: `${place.desc} ${place.writer}`,
  });

  kakao.maps.event.addListener(marker, "mouseover", ()=> {window.open(map, marker)});
  kakao.maps.event.addListener(marker, "mouseout", () => {window.close()});
}