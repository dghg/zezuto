import React from 'react';
import ReactDOM from 'react-dom';
import { createGlobalStyle } from 'styled-components';
import App from './pages/App';
import Login from './pages/Login';
import reportWebVitals from './reportWebVitals';
import { CookiesProvider } from 'react-cookie';
import { BrowserRouter, Route } from 'react-router-dom';

const GlobalStyle = createGlobalStyle`
  body {
    text-align: center;
    border: 5px solid gray;
  }
`
declare global {
  interface Window {
    kakao?: any;
  }
}

ReactDOM.render(
  <BrowserRouter>
    <CookiesProvider>
      <GlobalStyle />
      <Route path="/main" component={App}/>
      <Route path="/" component={Login}/>
    </CookiesProvider>
  </BrowserRouter>
  ,document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
