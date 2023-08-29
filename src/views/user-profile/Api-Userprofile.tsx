import { errorNotify } from '../../utils/ErrorPupUp';
import { successNotify } from '../../utils/SuccessPopUp';

export async function setNewFirstName(version: string, firstName: string) {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_CTP_API_URL}/${process.env.REACT_APP_CTP_PROJECT_KEY}/me`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
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
      successNotify(`Your name has been successfully changed to ${firstName}`);
      localStorage.setItem('customer', JSON.stringify(data));
      console.log(`New name set successfully`);
    } else {
      console.error(`Failed to set new name`);
    }
  } catch (error) {
    console.error(`Error setting new name:`, error);
  }
}

export async function setNewLastName(version: string, lastName: string) {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_CTP_API_URL}/${process.env.REACT_APP_CTP_PROJECT_KEY}/me`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
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
      console.log(`New last name set successfully`);
    } else {
      console.error(`Failed to set new last name`);
    }
  } catch (error) {
    console.error(`Error setting new last name:`, error);
  }
}

export async function setNewDateOfBirth(version: string, dateOfBirth: string) {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_CTP_API_URL}/${process.env.REACT_APP_CTP_PROJECT_KEY}/me`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
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
      console.log(`New date of birth set successfully`);
    } else {
      console.error(`Failed to set new date of birth`);
    }
  } catch (error) {
    console.error(`Error setting new date of birth:`, error);
  }
}

export async function setNewEmail(version: string, email: string) {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_CTP_API_URL}/${process.env.REACT_APP_CTP_PROJECT_KEY}/me`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
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
      console.log(`New email set successfully`);
    } else {
      console.error(`Failed to set new email`);
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
    const response = await fetch(
      `${process.env.REACT_APP_CTP_API_URL}/${process.env.REACT_APP_CTP_PROJECT_KEY}/me/password`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
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
      console.log(`New password set successfully`);
    } else {
      if (data.statusCode === 400) {
        errorNotify(`Wrong current password`);
      }
      console.error(`Failed to set new password`);
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
    const response = await fetch(
      `${process.env.REACT_APP_CTP_API_URL}/${process.env.REACT_APP_CTP_PROJECT_KEY}/me`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
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
      console.log(`Address change successfully`);
    } else {
      console.error(`Failed to change address`);
    }
  } catch (error) {
    console.error(`Error changing address:`, error);
  }
}

async function setShippingAddress(
  addressId: string,
  version: string,
  type: string,
) {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_CTP_API_URL}/${process.env.REACT_APP_CTP_PROJECT_KEY}/me`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
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
      console.log(data)
      localStorage.setItem('customer', JSON.stringify(data));
      console.log(`${type} seted successfully`);
    } else {
      console.error(`Failed to set ${type}`);
    }
  } catch (error) {
    console.error(`Error setting ${type}:`, error);
  }
}

async function setBillingAddress(
  addressId: string,
  version: string,
  type: string,
) {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_CTP_API_URL}/${process.env.REACT_APP_CTP_PROJECT_KEY}/me`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
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
      console.log(`${type} seted successfully`);
    } else {
      console.error(`Failed to set ${type}`);
    }
  } catch (error) {
    console.error(`Error setting ${type}:`, error);
  }
}


export async function addAddresses(version: string, streetName: string, postalCode: string, city: string, country: string | null, type: string) {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_CTP_API_URL}/${process.env.REACT_APP_CTP_PROJECT_KEY}/me`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
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
      console.log(`New ddresses added successfully`);
      successNotify(`Your new address has been successfully added`);
      if (type === 'billing') {
        await setBillingAddress(
          data.addresses[data.addresses.length - 1].id,
          data.version,
          type,
        );
      }
      if (type === 'shipping') {
        await setShippingAddress(
          data.addresses[data.addresses.length - 1].id,
          data.version,
          type,
        );
      }
    } else {
      console.error(`Failed to add new addresses`);
    }
  } catch (error) {
    console.error(`Error adding new addresses:`, error);
  }
}