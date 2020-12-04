import React from 'react';
import { Button } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {Place} from '../types';

interface Props {
  places: Place[];
  handleClick: any;
}

const Result: React.FunctionComponent<Props> = ({places, handleClick}) => {
  return (
    <List>
      {places.map((val,idx) => {
        return (
          <ListItem key={idx}>
            <Button onClick={()=>{handleClick(val)}}>
                <ListItemText primary={val.desc} />
            </Button>
          </ListItem>
        )
      })}
    </List>
  )
}

export default Result;