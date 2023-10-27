import { Dispatch, SetStateAction } from 'react';
import {
  ISignUpData,
  ISignUpState,
} from '../../../interfaces/signup.interface';

export function validatePostalCode(
  postalCode: string,
  country: string
): boolean {
  const postalCodeRegexMap: { [country: string]: RegExp } = {
    'Germany (DE)': /^\d{5}$/,
    'France (FR)': /^\d{5}$/,
    'United Kingdom (GB)': /^[A-Za-z]{1,2}\d{1,2}[A-Za-z]?\s?\d[A-Za-z]{2}$/,
    'Italy (IT)': /^\d{5}$/,
    'Spain (ES)': /^\d{5}$/,
    'Ukraine (UA)': /^\d{5}$/,
    'Poland (PL)': /^\d{2}-\d{3}$/,
    'Sweden (SE)': /^\d{5}$/,
    'Norway (NO)': /^\d{4}$/,
    'Finland (FI)': /^\d{5}$/,
    'Denmark (DK)': /^\d{4}$/,
    'Switzerland (CH)': /^\d{4}$/,
    'Austria (AT)': /^\d{4}$/,
    'Greece (GR)': /^\d{5}$/,
    'Portugal (PT)': /^\d{4}-\d{3}$/,
  };

  const regex = postalCodeRegexMap[country];

  if (!regex) {
    return false;
  }

  return regex.test(postalCode);
}

export function validateForm(
  setErrors: Dispatch<SetStateAction<Partial<ISignUpData>>>,
  signUpState: ISignUpState
) {
  const newErrors: Partial<ISignUpData> = {};

  if (!signUpState.signUpData.email) {
    newErrors.email = 'Email is required';
  } else if (!/^\S+@\S+\.\S+$/.test(signUpState.signUpData.email)) {
    newErrors.email = 'Invalid email format';
  }
  if (
    !signUpState.signUpData.password ||
    signUpState.signUpData.password.length < 8
  ) {
    newErrors.password = 'Password should have at least 8 characters';
  } else if (
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[ -/:@[-`{-~])/.test(
      signUpState.signUpData.password
    )
  ) {
    newErrors.password =
      'Password should have at least one uppercase letter, one lowercase letter, one number, and one special character (e.g., !@#$%^&*)';
  }
  if (!signUpState.signUpData.firstName) {
    newErrors.firstName = 'First name is required';
  } else if (!/^[A-Za-z]+$/.test(signUpState.signUpData.firstName)) {
    newErrors.firstName = 'First name should only contain letters';
  }
  if (!signUpState.signUpData.lastName) {
    newErrors.lastName = 'Last name is required';
  } else if (!/^[A-Za-z]+$/.test(signUpState.signUpData.lastName)) {
    newErrors.lastName = 'Last name should only contain letters';
  }
  if (!signUpState.signUpData.bd) {
    newErrors.bd = 'Date of Birth is required';
  } else {
    const bdDate = new Date(signUpState.signUpData.bd);
    const currentDate = new Date();
    const minAgeDate = new Date(
      currentDate.getFullYear() - 13,
      currentDate.getMonth(),
      currentDate.getDate()
    );

    if (bdDate > minAgeDate) {
      newErrors.bd = 'You must be at least 13 years old';
    }
  }
  if (!signUpState.signUpData.billingStreet) {
    newErrors.billingStreet = 'Street is required';
  }
  if (
    !signUpState.signUpData.shippingStreet &&
    !signUpState.signUpData.sameAddress
  ) {
    newErrors.shippingStreet = 'Street is required';
  }
  if (!signUpState.signUpData.billingCity) {
    newErrors.billingCity = 'City is required';
  } else if (!/^[A-Za-z\s]+$/.test(signUpState.signUpData.billingCity)) {
    newErrors.billingCity = 'City should only contain letters and spaces';
  }
  if (
    !signUpState.signUpData.shippingCity &&
    !signUpState.signUpData.sameAddress
  ) {
    newErrors.shippingCity = 'City is required';
  } else if (
    !/^[A-Za-z\s]+$/.test(signUpState.signUpData.shippingCity) &&
    !signUpState.signUpData.sameAddress
  ) {
    newErrors.shippingCity = 'City should only contain letters and spaces';
  }
  if (
    !validatePostalCode(
      signUpState.signUpData.billingPostalCode,
      signUpState.selectedBillingCountry || ''
    )
  ) {
    newErrors.billingPostalCode =
      'Invalid postal code format for the selected country';
  }
  if (
    !validatePostalCode(
      signUpState.signUpData.shippingPostalCode,
      signUpState.selectedShippingCountry || ''
    ) &&
    !signUpState.signUpData.sameAddress
  ) {
    newErrors.shippingPostalCode =
      'Invalid postal code format for the selected country';
  }
  if (!signUpState.selectedBillingCountry) {
    newErrors.billingCountry = 'Country is required';
  }
  if (
    !signUpState.selectedShippingCountry &&
    !signUpState.signUpData.sameAddress
  ) {
    newErrors.shippingCountry = 'Country is required';
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
}
