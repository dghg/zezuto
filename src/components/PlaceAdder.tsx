import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import Result from './Result';
import { Button, Input } from '@material-ui/core';
import { Place } from '../util/types';
import { checkDistance } from '../util/f';

const { kakao } = window;
interface Props {
  places: Place[];
  setSelectInfo: Function;
}

const PlaceAdder: React.FunctionComponent<Props> = ({places, setSelectInfo}) => {
  const [value, setValue] = useState<string>(''); // Form value
  const [results, setResults] = useState<Array<any>>([]); // search result value
  const [cookies] = useCookies();
  
  
  const searchPlaces = async (keyword: string) => {
    setValue('');
    var ps = new kakao.maps.services.Places(); // Create service 
    
    // TODO : filtering using distance between standard and data 
    ps.keywordSearch(keyword, (data: Array<any>, status: any, pagination: any) => {
      if(status === kakao.maps.services.Status.OK && data.length) {
        const inRangePlaces = data.filter(checkDistance);
        const _ = inRangePlaces.map((val,idx) => {
          return { 
            x: parseFloat(parseFloat(val.y).toFixed(4)),
            y: parseFloat(parseFloat(val.x).toFixed(4)),
            desc: val.place_name as string,
            writer: cookies.name as string,
          } as Place// make into array 
        });
        console.log(_);
        setResults(_);
      }
    });
  }
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if(e.target.value.length > 2) {
      searchPlaces(value);
    }
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
    <Result places={results} setSelectInfo={setSelectInfo} method="add"/>
  </>
  )
} // just render children.

export default PlaceAdder;