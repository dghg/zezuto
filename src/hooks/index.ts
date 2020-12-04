import {useState, useEffect} from 'react';
import {Place} from '../types';

export const useSomething = (method: "remove" | "add", setPlace: Function) => {
  const [selected, setSelected] = useState<Place | null>(null);
  
  useEffect(() => {
    if(selected) {
      (async () => {
        await setPlace(selected, method);
      })();
      setSelected(null);
    }
  }, [selected, method, setPlace]);
  
  return [selected, setSelected] as const;
};
