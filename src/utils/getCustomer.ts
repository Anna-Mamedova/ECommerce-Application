import { Dispatch, SetStateAction } from 'react';
import { NavigateFunction } from 'react-router-dom';
import { IData, IDataForm, ITokenData } from '../interfaces/auth.interface';
import { getCustomer, getToken } from '../views/authorization/log-in/Api-Login';
import { errorNotify } from './ErrorPupUp';
import { statusCodes } from '../enums/auth.enum';
import { expiredInSeconds } from './consts';
import { checkActiveCart } from '../views/basket/Create-Cart_Api';

import { ICartQuantityContext } from '../interfaces/context.interface';

async function saveToken(token: ITokenData) {
  localStorage.setItem('authToken', token.access_token);
  localStorage.setItem('refreshToken', token.refresh_token);
  localStorage.setItem('expiredIn', `${Date.now() + expiredInSeconds}`);
}

export async function getCustometWithToken(
  data: IData, 
  navigate: NavigateFunction, 
  setIsAuth: (newState: boolean) => void, 
  setCartQuantity: ICartQuantityContext["setCartQuantity"],
  setError?: Dispatch<SetStateAction<boolean>>, 
  setErrorMessage?: Dispatch<SetStateAction<IDataForm>>) {
  try {
    const token = await getToken({
      email: data.email,
      password: data.password,
    });

    if(token.statusCode === statusCodes.BAD_REQUEST) {
    if (setError && setErrorMessage) {
        errorNotify(token.message);
        setError(true);
        setErrorMessage({
          email: '',
          password: 'Incorect password or email',
        });
    }
    return;
  }

    const myCustomer = await getCustomer({
      accessToken: token.access_token,
      email: data.email,
      password: data.password,
    });

    if (myCustomer.customer.id) {
      navigate('/');
      await saveToken(token);
      setIsAuth(true);
      checkActiveCart(setCartQuantity);
      localStorage.setItem('customer', JSON.stringify(myCustomer.customer));
    }

    return myCustomer;
  } catch (error) {
    console.error(error);
  }
}