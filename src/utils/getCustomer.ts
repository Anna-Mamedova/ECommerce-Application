import { Dispatch, SetStateAction } from 'react';
import { NavigateFunction } from 'react-router-dom';
import { IData, IDataForm, ITokenData } from '../interfaces/auth.interface';
import { getCustomer, getToken } from '../views/authorization/log-in/Api-Login';
import { errorNotify } from './ErrorPupUp';
import { statusCodes } from '../enums/auth.enum';

async function saveToken(token: ITokenData) {
  localStorage.setItem('authToken', token.access_token);
  localStorage.setItem('refreshToken', token.refresh_token);
  localStorage.setItem('expiredIn', `${Date.now() + 172800}`);
}

export async function getCustometWithToken(
  data: IData, 
  navigate: NavigateFunction, 
  setIsAuth: (newState: boolean) => void, 
  setError?: Dispatch<SetStateAction<boolean>>, 
  setErrorMessage?: Dispatch<SetStateAction<IDataForm>>) {
  try {
    const token = await getToken({
      email: data.email,
      password: data.password,
    });
    const myCustomer = await getCustomer({
      accessToken: token.access_token,
      email: data.email,
      password: data.password,
    });

    if (setError && setErrorMessage) {
      if (token.statusCode === statusCodes.BAD_REQUEST) {
        errorNotify(token.message);
        setError(true);
        setErrorMessage({
          email: '',
          password: 'Incorect password or email',
        });
      }
    }

    if (myCustomer.customer.id) {
      navigate('/');
      saveToken(token);
      setIsAuth(true);
    }

    return myCustomer;
  } catch (error) {
    console.error(error);
  }
}