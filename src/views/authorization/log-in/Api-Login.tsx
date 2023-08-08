import { IDataCustomer, IDataForm } from '../../../interfaces/auth.interface';

export const getCustomer = async ({ accessToken }: IDataCustomer) => {
  try {
    const response = await fetch(
      'https://api.europe-west1.gcp.commercetools.com/chat_gpt_team/me',
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
  const clientId = 'eSDhgpWc3Xe0STDfwcr409jN';
  const clientSecret = 'Lr8lxqqkaddkGVCRo09_lU3c55rdfUcc';
  const credentials = `${clientId}:${clientSecret}`;
  const encodedCredentials = btoa(credentials);

  try {
    const response = await fetch(
      'https://auth.europe-west1.gcp.commercetools.com/oauth/chat_gpt_team/customers/token',
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
