import React, { useCallback, useState } from 'react';
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
  const [results, setResults] = useState<Array<any> | "FAIL">([]); // search result value
  const [cookies] = useCookies();
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const searchPlaces = (keyword: string) => {
    console.log("SERARCH")
    var ps = new kakao.maps.services.Places(); // Create service 
    
    ps.keywordSearch(keyword, (data: Array<any>, status: any, pagination: any) => {
      if(keyword !== value) {
        return;
      }
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
        setIsSearching(false);
        if(_.length > 0) {
          setResults(_);
        }
        else {
          setResults("FAIL");
        }
      }
      else { // fail to search 
        setResults("FAIL");
        setIsSearching(false);
      }
    });
  }
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }
  const handleSubmit = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSearching(true);
    searchPlaces(value);
    }

  return (
  <>
    <h1>{results.length && results !== "FAIL" ? "원하는 장소를 누르면 추가됩니다." : "가고 싶은 곳을 검색해 보세요."}</h1>
    <form onSubmit={handleSubmit}>
      <Input onChange={handleChange} />
      <Button type="submit">검색</Button>
    </form>
    {isSearching ? <h1>검색 중입니다.</h1> : results === "FAIL" ? <h1>결과가 존재하지 않습니다. 다시 검색해 주세요.</h1> : <Result places={results} setSelectInfo={setSelectInfo} method="add"/>}
  </>
  )
} // just render children.

export default PlaceAdder;