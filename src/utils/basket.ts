import { ILineItem } from "../interfaces/auth.interface";
import { getAnonToken, updateCart } from "../views/basket/Create-Cart_Api";

export const getInitialCartItemsQuantity = () => {
  const getIsAuth = localStorage.getItem('isAuth') === 'true';
  const cartDataString = getIsAuth
    ? localStorage.getItem('cartData')
    : localStorage.getItem('anonCartData');

  if (cartDataString) {
    const cartData = JSON.parse(cartDataString);
    return cartData.totalLineItemQuantity || 0;
  }

  return 0;
}

export const getLineItemId = (productId: string, getIsAuth: boolean): string => {
  const storageKey = getIsAuth ? 'cartData' : 'anonCartData';
  const data = JSON.parse(localStorage.getItem(storageKey) || '').lineItems;

  return data.reduce((acc: string, cur: ILineItem) => {
    if (cur.productId === productId) {
      return acc + cur.id;
    }
    return acc;
  }, '');
}

export const initializeItemsCart = (getIsAuth: boolean) => {
  if (getIsAuth) {
    return JSON.parse(localStorage.getItem('cartItem') || '');
  } else if (localStorage.getItem('anonCartItem')) {
    return JSON.parse(localStorage.getItem('anonCartItem') || '');
  } else {
    return [];
  }
};

export const handleAddToCart = async (
  productId: string,
  getIsAuth: boolean,
  setCartQuantity: (quantity: number) => void,
  setItemsCart: (cart: ILineItem[]) => void
) => {
  if (getIsAuth) {
    await updateCart(productId, setCartQuantity);
    setItemsCart(JSON.parse(localStorage.getItem('cartItem') || ''));
  } else if (localStorage.getItem('anonToken')) {
    await updateCart(productId, setCartQuantity);
    setItemsCart(JSON.parse(localStorage.getItem('anonCartItem') || ''));
  } else {
    await getAnonToken();
    await updateCart(productId, setCartQuantity);
    setItemsCart(JSON.parse(localStorage.getItem('anonCartItem') || ''));
  }
}