import React from 'react';
import {useSomething} from '../hooks';
import {Place} from '../types';
import Result from './Result';

interface Props {
  places: Place[];
  setPlace: Function;
  setMethod: Function;
}
const PlaceSelector: React.FunctionComponent<Props> = ({places, setPlace, setMethod}) => {
  const [s, setS] = useSomething("remove", setPlace);
  return (
    <>
      <h1>원하는 장소를 누르면 삭제됩니다.</h1>
      <Result places={places} handleClick={setS}/>
    </>
  )
}

export default PlaceSelector;