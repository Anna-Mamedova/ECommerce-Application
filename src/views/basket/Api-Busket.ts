import { ILineItem } from "../../interfaces/auth.interface";
import { ICartQuantityContext } from "../../interfaces/context.interface";
import { errorNotify } from "../../utils/ErrorPupUp";
import { successNotify } from "../../utils/SuccessPopUp";
import { scheduleTokenRefresh } from "../../utils/refreshToken";

export async function PromoCode(
  discountCode: string,
  setCartQuantity: ICartQuantityContext['setCartQuantity'],
  totalPriceCallback: (newTotalPrice: number) => void
) {
  const getIsAuth = localStorage.getItem('isAuth') === 'true';
  const cartData = getIsAuth
    ? JSON.parse(localStorage.getItem('cartData') || '')
    : JSON.parse(localStorage.getItem('anonCartData') || '');
    
  try {
    await scheduleTokenRefresh();
    const authToken = getIsAuth
      ? localStorage.getItem('authToken')
      : localStorage.getItem('anonToken');

    if (authToken) {
      const response = await fetch(
        `${process.env.REACT_APP_CTP_API_URL}/${process.env.REACT_APP_CTP_PROJECT_KEY}/me/carts/${cartData.id}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            version: cartData.version,
            actions: [
              {
                action: 'addDiscountCode',
                code: discountCode
              },
            ],
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        setCartQuantity(data.totalLineItemQuantity);
        successNotify('Promocode has been succesfully applied')

        const itemCart: string[] = [];
        for(let i = 0; i < data.lineItems.length; i+= 1) {
          itemCart.push(data.lineItems[i].productId)
        }

        getIsAuth
        ? (localStorage.setItem('cartData', JSON.stringify(data)), localStorage.setItem('cartItem', JSON.stringify(itemCart)))
        : (localStorage.setItem('anonCartData', JSON.stringify(data)), localStorage.setItem('anonCartItem', JSON.stringify(itemCart)));

        const newTotalPrice = data.totalPrice.centAmount;
        totalPriceCallback(newTotalPrice);
        return data
      }
      else {
        errorNotify(`${data.message}`)
      }
    }
  } catch (error) {
    console.error(error);
  }
}


export async function removeItem(
  itemProduct: ILineItem,
  setCartQuantity: ICartQuantityContext['setCartQuantity'],
  totalPriceCallback: (newTotalPrice: number) => void
) {
  const getIsAuth = localStorage.getItem('isAuth') === 'true';
  const cartData = getIsAuth
    ? JSON.parse(localStorage.getItem('cartData') || '')
    : JSON.parse(localStorage.getItem('anonCartData') || '');
    
  try {
    await scheduleTokenRefresh();
    const authToken = getIsAuth
      ? localStorage.getItem('authToken')
      : localStorage.getItem('anonToken');

    if (authToken) {
      const response = await fetch(
        `${process.env.REACT_APP_CTP_API_URL}/${process.env.REACT_APP_CTP_PROJECT_KEY}/me/carts/${cartData.id}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            version: cartData.version,
            actions: [
              {
                action: 'removeLineItem',
                lineItemId: itemProduct.id,
              },
            ],
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        setCartQuantity(data.totalLineItemQuantity || 0);

        const itemCart: string[] = [];
        for(let i = 0; i < data.lineItems.length; i+= 1) {
          itemCart.push(data.lineItems[i].productId)
        }

        getIsAuth
        ? (localStorage.setItem('cartData', JSON.stringify(data)), localStorage.setItem('cartItem', JSON.stringify(itemCart)))
        : (localStorage.setItem('anonCartData', JSON.stringify(data)), localStorage.setItem('anonCartItem', JSON.stringify(itemCart)));

        const newTotalPrice = data.totalPrice.centAmount;
        totalPriceCallback(newTotalPrice); 
      }
    }
  } catch (error) {
    console.error(error);
  }
}

export async function changeQuantityItem(
  itemProduct: ILineItem,
  newQuantity: number,
  setCartQuantity: ICartQuantityContext['setCartQuantity'],
  totalPriceCallback: (newTotalPrice: number) => void
) {
  const getIsAuth = localStorage.getItem('isAuth') === 'true';
  const cartData = getIsAuth
    ? JSON.parse(localStorage.getItem('cartData') || '')
    : JSON.parse(localStorage.getItem('anonCartData') || '');
    
  try {
    await scheduleTokenRefresh();
    const authToken = getIsAuth
      ? localStorage.getItem('authToken')
      : localStorage.getItem('anonToken');

    if (authToken) {
      const response = await fetch(
        `${process.env.REACT_APP_CTP_API_URL}/${process.env.REACT_APP_CTP_PROJECT_KEY}/me/carts/${cartData.id}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            version: cartData.version,
            actions: [
              {
                action: 'changeLineItemQuantity',
                lineItemId: itemProduct.id,
                quantity: newQuantity,
              },
            ],
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        setCartQuantity(data.totalLineItemQuantity);

        const itemCart: string[] = [];
        for(let i = 0; i < data.lineItems.length; i+= 1) {
          itemCart.push(data.lineItems[i].productId)
        }

        getIsAuth
        ? (localStorage.setItem('cartData', JSON.stringify(data)), localStorage.setItem('cartItem', JSON.stringify(itemCart)))
        : (localStorage.setItem('anonCartData', JSON.stringify(data)), localStorage.setItem('anonCartItem', JSON.stringify(itemCart)));

        const newTotalPrice = data.totalPrice.centAmount;
        totalPriceCallback(newTotalPrice); 
      }
    }
  } catch (error) {
    console.error(error);
  }
}

export async function removeCart(
  setCartQuantity: ICartQuantityContext['setCartQuantity']
) {
  const getIsAuth = localStorage.getItem('isAuth') === 'true';
  const cartData = getIsAuth
    ? JSON.parse(localStorage.getItem('cartData') || '')
    : JSON.parse(localStorage.getItem('anonCartData') || '');
    
  try {
    await scheduleTokenRefresh();
    const authToken = getIsAuth
      ? localStorage.getItem('authToken')
      : localStorage.getItem('anonToken');

    if (authToken) {
      const response = await fetch(
        `${process.env.REACT_APP_CTP_API_URL}/${process.env.REACT_APP_CTP_PROJECT_KEY}/me/carts/${cartData.id}?version=${cartData.version}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
          body: new URLSearchParams({
             version: `${cartData.version}`
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        setCartQuantity(data.totalLineItemQuantity);
      }
    }
  } catch (error) {
    console.error(error);
  }
}