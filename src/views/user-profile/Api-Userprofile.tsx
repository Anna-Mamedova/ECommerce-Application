import { errorNotify } from '../../utils/ErrorPupUp';
import { successNotify } from '../../utils/SuccessPopUp';
import { scheduleTokenRefresh } from '../../utils/refreshToken';

export async function setNewFirstName(version: string, firstName: string) {
  try {
    await scheduleTokenRefresh();
    const authToken = localStorage.getItem('authToken');

    if (authToken) {
      const response = await fetch(
        `${process.env.REACT_APP_CTP_API_URL}/${process.env.REACT_APP_CTP_PROJECT_KEY}/me`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            version: version,
            actions: [
              {
                action: 'setFirstName',
                firstName: firstName,
              },
            ],
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        successNotify(
          `Your name has been successfully changed to ${firstName}`
        );
        localStorage.setItem('customer', JSON.stringify(data));
      }
    }
  } catch (error) {
    console.error(`Error setting new name:`, error);
  }
}

export async function setNewLastName(version: string, lastName: string) {
  try {
    await scheduleTokenRefresh();
    const authToken = localStorage.getItem('authToken');

    if (authToken) {
      const response = await fetch(
        `${process.env.REACT_APP_CTP_API_URL}/${process.env.REACT_APP_CTP_PROJECT_KEY}/me`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            version: version,
            actions: [
              {
                action: 'setLastName',
                lastName: lastName,
              },
            ],
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        successNotify(
          `Your last name has been successfully changed to ${lastName}`
        );
        localStorage.setItem('customer', JSON.stringify(data));
      }
    }
  } catch (error) {
    console.error(`Error setting new last name:`, error);
  }
}

export async function setNewDateOfBirth(version: string, dateOfBirth: string) {
  try {
    await scheduleTokenRefresh();
    const authToken = localStorage.getItem('authToken');

    if (authToken) {
      const response = await fetch(
        `${process.env.REACT_APP_CTP_API_URL}/${process.env.REACT_APP_CTP_PROJECT_KEY}/me`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            version: version,
            actions: [
              {
                action: 'setDateOfBirth',
                dateOfBirth: dateOfBirth,
              },
            ],
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        successNotify(
          `Your date of birth has been successfully changed to ${dateOfBirth}`
        );
        localStorage.setItem('customer', JSON.stringify(data));
      }
    }
  } catch (error) {
    console.error(`Error setting new date of birth:`, error);
  }
}

export async function setNewEmail(version: string, email: string) {
  try {
    await scheduleTokenRefresh();
    const authToken = localStorage.getItem('authToken');

    if (authToken) {
      const response = await fetch(
        `${process.env.REACT_APP_CTP_API_URL}/${process.env.REACT_APP_CTP_PROJECT_KEY}/me`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            version: version,
            actions: [
              {
                action: 'changeEmail',
                email: email,
              },
            ],
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        successNotify(`Your email has been successfully changed to ${email}`);
        localStorage.setItem('customer', JSON.stringify(data));
      }
    }
  } catch (error) {
    console.error(`Error setting new email:`, error);
  }
}

export async function resetPassword(
  version: string,
  newPassword: string,
  currentPassword: string
) {
  try {
    await scheduleTokenRefresh();
    const authToken = localStorage.getItem('authToken');

    if (authToken) {
      const response = await fetch(
        `${process.env.REACT_APP_CTP_API_URL}/${process.env.REACT_APP_CTP_PROJECT_KEY}/me/password`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            version: version,
            currentPassword: currentPassword,
            newPassword: newPassword,
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        successNotify(`Your passwor has been successfully changed`);
        localStorage.setItem('customer', JSON.stringify(data));
      } else {
        if (data.statusCode === 400) {
          errorNotify(`Wrong current password`);
        }
      }
    }
  } catch (error) {
    console.error(`Error setting new password:`, error);
  }
}

export async function changeAddress(
  version: string,
  addressId: string,
  city: string,
  street: string,
  postalCode: string,
  country: string | null
) {
  try {
    await scheduleTokenRefresh();
    const authToken = localStorage.getItem('authToken');

    if (authToken) {
      const response = await fetch(
        `${process.env.REACT_APP_CTP_API_URL}/${process.env.REACT_APP_CTP_PROJECT_KEY}/me`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            version: version,
            actions: [
              {
                action: 'changeAddress',
                addressId: addressId,
                address: {
                  streetName: street,
                  postalCode: postalCode,
                  city: city,
                  country: country?.slice(country.indexOf('(') + 1, -1),
                },
              },
            ],
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        successNotify(`Your address has been successfully changed`);
        localStorage.setItem('customer', JSON.stringify(data));
      }
    }
  } catch (error) {
    console.error(`Error changing address:`, error);
  }
}

async function setShippingAddress(
  addressId: string,
  version: string,
  type: string
) {
  try {
    await scheduleTokenRefresh();
    const authToken = localStorage.getItem('authToken');

    if (authToken) {
      const response = await fetch(
        `${process.env.REACT_APP_CTP_API_URL}/${process.env.REACT_APP_CTP_PROJECT_KEY}/me`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            version: version,
            actions: [
              {
                action: `addShippingAddressId`,
                addressId: `${addressId}`,
              },
            ],
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('customer', JSON.stringify(data));
      }
    }
  } catch (error) {
    console.error(`Error setting ${type}:`, error);
  }
}

async function setBillingAddress(
  addressId: string,
  version: string,
  type: string
) {
  try {
    await scheduleTokenRefresh();
    const authToken = localStorage.getItem('authToken');

    if (authToken) {
      const response = await fetch(
        `${process.env.REACT_APP_CTP_API_URL}/${process.env.REACT_APP_CTP_PROJECT_KEY}/me`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            version: version,
            actions: [
              {
                action: `addBillingAddressId`,
                addressId: `${addressId}`,
              },
            ],
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('customer', JSON.stringify(data));
      }
    }
  } catch (error) {
    console.error(`Error setting ${type}:`, error);
  }
}

export async function addAddresses(
  version: string,
  city: string,
  streetName: string,
  postalCode: string,
  country: string | null,
  type: string
) {
  try {
    await scheduleTokenRefresh();
    const authToken = localStorage.getItem('authToken');

    if (authToken) {
      const response = await fetch(
        `${process.env.REACT_APP_CTP_API_URL}/${process.env.REACT_APP_CTP_PROJECT_KEY}/me`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            version: version,
            actions: [
              {
                action: 'addAddress',
                address: {
                  streetName: `${streetName}`,
                  postalCode: `${postalCode}`,
                  city: `${city}`,
                  country: country?.slice(country.indexOf('(') + 1, -1),
                },
              },
            ],
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        successNotify(`Your new address has been successfully added`);
        if (type === 'billing') {
          await setBillingAddress(
            data.addresses[data.addresses.length - 1].id,
            data.version,
            type
          );
        }
        if (type === 'shipping') {
          await setShippingAddress(
            data.addresses[data.addresses.length - 1].id,
            data.version,
            type
          );
        }
      }
    }
  } catch (error) {
    console.error(`Error adding new addresses:`, error);
  }
}

export async function removeAddresses(version: string, addressId: string) {
  try {
    await scheduleTokenRefresh();
    const authToken = localStorage.getItem('authToken');

    if (authToken) {
      const response = await fetch(
        `${process.env.REACT_APP_CTP_API_URL}/${process.env.REACT_APP_CTP_PROJECT_KEY}/me`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            version: version,
            actions: [
              {
                action: 'removeAddress',
                addressId: addressId,
              },
            ],
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('customer', JSON.stringify(data));
        successNotify(`Your address has been successfully removed`);
      }
    }
  } catch (error) {
    console.error(`Error remove addresses:`, error);
  }
}

export async function setDefaultShippingAddress(
  version: string,
  addressId: string
) {
  try {
    await scheduleTokenRefresh();
    const authToken = localStorage.getItem('authToken');

    if (authToken) {
      const response = await fetch(
        `${process.env.REACT_APP_CTP_API_URL}/${process.env.REACT_APP_CTP_PROJECT_KEY}/me`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            version: version,
            actions: [
              {
                action: `setDefaultShippingAddress`,
                addressId: `${addressId}`,
              },
            ],
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('customer', JSON.stringify(data));
        successNotify(
          `Your default shipping address has been successfully seted`
        );
      }
    }
  } catch (error) {
    console.error(`Error setting shipping default address:`, error);
  }
}

export async function setDefaultBillingAddress(
  version: string,
  addressId: string
) {
  try {
    await scheduleTokenRefresh();
    const authToken = localStorage.getItem('authToken');

    if (authToken) {
      const response = await fetch(
        `${process.env.REACT_APP_CTP_API_URL}/${process.env.REACT_APP_CTP_PROJECT_KEY}/me`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            version: version,
            actions: [
              {
                action: `setDefaultBillingAddress`,
                addressId: `${addressId}`,
              },
            ],
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('customer', JSON.stringify(data));
        successNotify(
          `Your default billing address has been successfully seted`
        );
      }
    }
  } catch (error) {
    console.error(`Error setting billing default address:`, error);
  }
}
