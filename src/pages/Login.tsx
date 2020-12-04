import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { Redirect } from 'react-router-dom';
import { Button, Input } from '@material-ui/core';
const Login: React.FunctionComponent = ({}) => {
  const [name, setName] = useState<string>('');
  const [cookies, setCookie] = useCookies(['name']);
  const handleChange = (e: any) => {
    setName(e.target.value);
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setCookie('name', name);
    e.target.value = '';
  };
  return (
    cookies.name 
    ? <Redirect to="/main" /> 
    : 
    <>
      <h1>이름이 뭐에요?</h1>
      <form onSubmit={handleSubmit}>
        <Input onChange={handleChange}/>
        <Button variant="outlined" type="submit">+</Button>
      </form> 
    </> 
  )
};

export default Login;