import { IDataCustomer, IDataForm } from '../../../interfaces/auth.interface';

export const getCustomer = async ({ accessToken }: IDataCustomer) => {
  try {
    const response = await fetch(
      `${process.env.CTP_API_URL}/chat_gpt_team/me`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.json();
  } catch (error) {
    console.error('Error getting token:', error);
  }
};

export const getToken = async ({ email, password }: IDataForm) => {
  const clientId = process.env.CTP_CLIENT_ID;
  const clientSecret = process.env.CTP_CLIENT_SECRET;
  const credentials = `${clientId}:${clientSecret}`;
  const encodedCredentials = btoa(credentials);

  try {
    const response = await fetch(
      `${process.env.CTP_AUTH_URL}/oauth/chat_gpt_team/customers/token`,
      {
        method: 'POST',
        headers: {
          Authorization: `Basic ${encodedCredentials}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'password',
          username: `${email}`,
          password: `${password}`,
        }),
      }
    );
    return response.json();
  } catch (error) {
    console.error('Error getting token:', error);
  }
};
