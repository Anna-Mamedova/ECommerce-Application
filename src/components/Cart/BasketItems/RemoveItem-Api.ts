import { ICartQuantityContext } from "../../../interfaces/context.interface";
import { errorNotify } from "../../../utils/ErrorPupUp";
import { successNotify } from "../../../utils/SuccessPopUp";
import { scheduleTokenRefresh } from "../../../utils/refreshToken";

export async function removeItem(
  productId: string,
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
                lineItemId: productId,
              },
            ],
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        successNotify('Item was deleted');
        setCartQuantity(data.totalLineItemQuantity || 0);
        console.log('delete');
        const itemCart: string[] = [];
        for(let i = 0; i < data.lineItems.length; i+= 1) {
          itemCart.push(data.lineItems[i].productId)
        }

        getIsAuth
        ? (localStorage.setItem('cartData', JSON.stringify(data)), localStorage.setItem('cartItem', JSON.stringify(itemCart)))
        : (localStorage.setItem('anonCartData', JSON.stringify(data)), localStorage.setItem('anonCartItem', JSON.stringify(itemCart)));
      } else {
        errorNotify(`${data.message}`)
      }
    }
  } catch (error) {
    console.error(error);
  }
}
