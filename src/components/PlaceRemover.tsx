import React from 'react';
import {Place} from '../util/types';
import Result from './Result';

interface Props {
  places: Place[];
  setSelectInfo: Function;
}
const PlaceRemover: React.FunctionComponent<Props> = ({places, setSelectInfo}) => {
  return (
    <>
      <h1>원하는 장소를 누르면 삭제됩니다.</h1>
      <Result places={places} setSelectInfo={setSelectInfo} method="remove"/>
    </>
  )
}

export default PlaceRemover;