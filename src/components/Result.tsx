import React from 'react';
import { Button } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {Place} from '../util/types';

interface Props {
  places: Place[];
  setSelectInfo: Function;
  method: "add" | "remove";
}

const Result: React.FunctionComponent<Props> = ({places, setSelectInfo, method}) => {
  return (
    <List>
      {places.map((val,idx) => {
        return (
          <ListItem key={idx}>
            <Button onClick={()=>{setSelectInfo({place: val, method})}}>
                <ListItemText primary={val.desc} />
            </Button>
          </ListItem>
        )
      })}
    </List>
  )
}

export default Result;