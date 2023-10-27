import React, { useEffect, useState } from 'react';
import AppRouter from './AppRouter';
import { BrowserRouter } from 'react-router-dom';
import NavBar from './NavBar/NavBar';
import {
  AccessTokenContext,
  AuthContext,
  СartQuantityContext,
} from '../context';
import { HttpMethod } from '../enums/auth.enum';
import { getInitialCartItemsQuantity } from '../utils/basket';
import Footer from './Footer/Footer';

const fetchAccessToken = async (callback?: (accessToken: string) => void) => {
  const authUrl = `${process.env.REACT_APP_CTP_AUTH_URL}/oauth/token`;
  const clientId = process.env.REACT_APP_CTP_CLIENT_ID;
  const clientSecret = process.env.REACT_APP_CTP_CLIENT_SECRET;

  const requestOptions: RequestInit = {
    method: HttpMethod.POST,
    headers: {
      Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
    }),
  };

  try {
    const response = await fetch(authUrl, requestOptions);
    const data = await response.json();
    const accesToken = data.access_token;
    callback && callback(accesToken);
  } catch (error) {
    console.error('Error fetching access token:', error);
  }
};

export default function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [accessToken, setAccessToken] = useState('');
  const [cartQuantity, setCartQuantity] = useState(
    getInitialCartItemsQuantity()
  );

  useEffect(() => {
    if (localStorage.getItem('authToken')) setIsAuth(true);
    fetchAccessToken(setAccessToken);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth }}>
      <AccessTokenContext.Provider
        value={{ token: accessToken, setToken: setAccessToken }}
      >
        <СartQuantityContext.Provider value={{ cartQuantity, setCartQuantity }}>
          <BrowserRouter>
            <NavBar />
            <AppRouter />
            <Footer />
          </BrowserRouter>
        </СartQuantityContext.Provider>
      </AccessTokenContext.Provider>
    </AuthContext.Provider>
  );
}
