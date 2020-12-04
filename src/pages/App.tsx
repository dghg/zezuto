import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Map from '../components/Map';
import { Button } from '@material-ui/core';
import PlaceAdder from '../components/PlaceAdder';
import PlaceRemover from '../components/PlaceRemover';
import { Redirect } from 'react-router-dom';
import {Place} from '../util/types';
import {useCookies} from 'react-cookie';

interface SelectInfo {
  place: Place;
  method: "add" | "remove";
}
const App_: React.FunctionComponent = () => {
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [method, setMethod] = useState<"add" | "remove" | null>(null);
  const [selectInfo, setSelectInfo] = useState<SelectInfo | null>(null);

  const [cookies] = useCookies();

  const setPlace = async (info: SelectInfo) => {
    const url = "https://fbqzahyhhg.execute-api.us-east-1.amazonaws.com/dev/postData";
    let data;
    if(info.method === "add") {
      data = JSON.stringify([...places, info.place]);
    }
    else {
      places.splice(places.indexOf(info.place),1);
      data = places;
    }
    
    const result = await axios.post(url, data);
    if(result.status === 200) {
      setPlaces(result.data); // 통채로 교체
      setMethod(null);
    }
    else {
      // TODO
    }
  }

  useEffect(() => {
    if(selectInfo) {
      (async () => {
        await setPlace(selectInfo);
      })();
      setSelectInfo(null);
    }
  }, [selectInfo]);

  useEffect(() => { // Initial Loading
    setLoading(true);
    (async () => {  
      const result = await axios.get("https://fbqzahyhhg.execute-api.us-east-1.amazonaws.com/dev/getData");
      if(result.status === 200) {
        setPlaces(result.data);
        setLoading(false);
      }
    })();
  }, []);

  const filtered = places.length ? places.filter((val) => {return val.writer === cookies.name}) : [];
  return (
    cookies.name ?
    <>
      {loading ? <div>지도를 불러오는 중입니다.</div>:<Map places={places}/>}
      {method === null ? <><h1>가고 싶은 곳</h1><Button onClick={()=>{setMethod("add")}}>추가</Button><Button onClick={()=>{setMethod("remove")}}>삭제</Button></>: null}
      {method === "add" ? <PlaceAdder places={places} setSelectInfo={setSelectInfo}/> : null}
      {method === "remove" ? <PlaceRemover places={filtered} setSelectInfo={setSelectInfo}/> : null}
    </>
    : <Redirect to="/" />
  )

};

export default App_;