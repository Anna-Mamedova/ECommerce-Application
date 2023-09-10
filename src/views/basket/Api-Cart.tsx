import { scheduleTokenRefresh } from '../../utils/refreshToken';

export async function checkActiveCart() {
  try {
    await scheduleTokenRefresh();
    const authToken = localStorage.getItem('authToken');

    if (authToken) {
      const response = await fetch(
        `${process.env.REACT_APP_CTP_API_URL}/${process.env.REACT_APP_CTP_PROJECT_KEY}/me/active-cart`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('cartData', JSON.stringify(data));
      } else if (data.statusCode === 404) {
        createNewCart();
      }
    }
  } catch (error) {
    console.error(error);
  }
}

export async function createNewCart() {
  try {
    await scheduleTokenRefresh();
    const getIsAuth = localStorage.getItem('isAuth') === 'true';
    const authToken = getIsAuth
      ? localStorage.getItem('authToken')
      : localStorage.getItem('anonToken');

    if (authToken) {
      const response = await fetch(
        `${process.env.REACT_APP_CTP_API_URL}/${process.env.REACT_APP_CTP_PROJECT_KEY}/me/carts`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            currency: 'USD',
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        getIsAuth
          ? localStorage.setItem('cartData', JSON.stringify(data))
          : localStorage.setItem('anonCartData', JSON.stringify(data));
        console.log(JSON.parse(localStorage.getItem('anonCartData') || ''));
      }
    }
  } catch (error) {
    console.error(error);
  }
}

export async function updateCart(productId: string) {
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
                action: 'addLineItem',
                productId: productId,
                variantId: 1,
                quantity: 1,
              },
            ],
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        // successNotify(`Your passwor has been successfully changed`);
        getIsAuth
          ? localStorage.setItem('cartData', JSON.stringify(data))
          : localStorage.setItem('anonCartData', JSON.stringify(data));
      }
    }
  } catch (error) {
    console.error(error);
  }
}

export async function getAnonToken() {
  const credentials = `${process.env.REACT_APP_CTP_CLIENT_ID}:${process.env.REACT_APP_CTP_CLIENT_SECRET}`;
  const encodedCredentials = btoa(credentials);

  try {
    const response = await fetch(
      `${process.env.REACT_APP_CTP_AUTH_URL}/oauth/chat_gpt_team/anonymous/token`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${encodedCredentials}`,
        },
        body: new URLSearchParams({
          grant_type: 'client_credentials',
        }),
      }
    );

    const data = await response.json();
    if (response.ok) {
      localStorage.setItem('anonToken', data.access_token);
      localStorage.setItem('refreshAnonToken', data.refresh_token);
      await createNewCart();
    }
  } catch (error) {
    console.error('Error fetching anon token:', error);
    throw error;
  }
}
