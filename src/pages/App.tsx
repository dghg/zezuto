import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Map from '../components/Map';
import { Button } from '@material-ui/core';
import SearchBar from '../components/SearchBar';
import PlaceSelector from '../components/PlaceSelector';
import { Redirect } from 'react-router-dom';
import {Place} from '../types';
import {useCookies} from 'react-cookie';
const App_: React.FunctionComponent = () => {
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [method, setMethod] = useState<"add" | "remove" | null>(null);
  const [cookies] = useCookies();

  const setPlace = async (place: Place, method: "add" | "remove") => {
    const url = "https://fbqzahyhhg.execute-api.us-east-1.amazonaws.com/dev/postData";
    let data;
    if(method === "add") {
      data = JSON.stringify([...places, place]);
    }
    else {
      places.splice(places.indexOf(place),1);
      data = places;
    }
    
    const result = await axios.post(url, data);
    if(result.status === 200) {
      setPlaces(result.data);
    }
  }
  
  useEffect(()=> {
    setLoading(true);
    (async () => {  
      const result = await axios.get("https://fbqzahyhhg.execute-api.us-east-1.amazonaws.com/dev/getData");
      if(result.status === 200) {
        setPlaces(result.data);
        setLoading(false);
      }
    })();
  }, []);
  
  const filtered = places.filter((val) => {return val.writer === cookies.name});
  return (
    cookies.name ?
    <>
      {loading ? <div>지도를 불러오는 중입니다.</div>:<Map places={places}/>}
      {method === null ? <><h1>가고 싶은 곳</h1><Button onClick={()=>{setMethod("add")}}>추가</Button><Button onClick={()=>{setMethod("remove")}}>삭제</Button></>: null}
      {method === "add" ? <SearchBar places={places} setPlace={setPlace} setMethod={setMethod}/> : null}
      {method === "remove" ? <PlaceSelector places={filtered} setPlace={setPlace} setMethod={setMethod}/> : null}
    </>
    : <Redirect to="/" />
  )

};

export default App_;

/*
데이터 추가 : API CALL > 응답 setPlaces를 이용해서JSON.parse > useEffect 로 */