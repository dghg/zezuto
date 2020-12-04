import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useSomething } from '../hooks';
import Result from './Result';
import { Button, Input } from '@material-ui/core';

import { Place } from '../types';
const { kakao } = window;
interface Props {
  places: Place[];
  setPlace: Function;
  setMethod: Function;
}

const Search: React.FunctionComponent<Props> = ({places, setPlace, setMethod}) => {
  const [value, setValue] = useState<string>('');
  const [results, setResults] = useState<Array<any>>([]);
  const [cookies] = useCookies();
  const [s, setS] = useSomething("add", setPlace);
  
// todo : searchPlaces 이후 setS로 넘긴다음 setMethod로 초기화 해줘야함. >> 옆 cmp도 마찬가지
  const searchPlaces = (keyword: string) => {
    setValue('');
    var ps = new kakao.maps.services.Places(); // Create service 
    new Promise((resolve) => {
      
    });
    ps.keywordSearch(keyword, (data: Array<any>, status: any, pagination: any) => {
      if(status === kakao.maps.services.Status.OK) {
        const _ = data.map((val,idx) => {
          return { 
            x: parseFloat(parseFloat(val.y).toFixed(4)),
            y: parseFloat(parseFloat(val.x).toFixed(4)),
            desc: val.place_name as string,
            writer: cookies.name as string,
          } as Place// make into array 
        });
        setResults(_);
      }
    });
  }
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }
  const handleSubmit = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    searchPlaces(value);
    }
  return (
  <>
    <h1>{results.length ? "원하는 장소를 누르면 추가됩니다." : "가고 싶은 곳을 검색해 보세요."}</h1>
    <form onSubmit={handleSubmit}>
      <Input onChange={handleChange} />
      <Button>검색</Button>
    </form>
    <Result places={results} handleClick={setS}/>
  </>
  )
} // just render children.

export default Search;