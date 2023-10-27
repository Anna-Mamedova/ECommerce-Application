import { blueGrey } from '@mui/material/colors';
import { IDataForm } from '../interfaces/auth.interface';

export const MAIN_ROUTE = '/';
export const LOGIN_ROUTE = '/login';
export const REGISTRATION_ROUTE = '/registration';
export const ABOUTUS_ROUTE = '/about-us';
export const CATALOG_ROUTE = '/catalog';
export const PRODUCT_ID_ROUTE = 'catalog/:id';
export const USER_PROFILE = '/user-profile';
export const CART_ROUTE = '/cart';

export const grey = blueGrey['A700'];
export const formFieldsDefault: IDataForm = {
  email: '',
  password: '',
};

export const expiredInSeconds = 172800;

export const styleModalWindow = {
  bgcolor: 'background.paper',
  boxShadow: 2,
  width: '515px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '@media (max-width: 600px)': {
    width: '89%',
    height: 'auto'
  },
};

export const array: string[] = [];
