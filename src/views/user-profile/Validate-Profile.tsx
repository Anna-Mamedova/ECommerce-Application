import { ProfileData } from '../../types/user-profile.type';
import { validatePostalCode } from '../authorization/sign-up/Validate-Signup';

export function validateName(
  setErrors: React.Dispatch<React.SetStateAction<Partial<ProfileData>>>,
  firstName: string
) {
  const newErrors: Partial<ProfileData> = {};
  if (!firstName) {
    newErrors.firstName = 'First name is required';
  } else if (!/^[A-Za-z]+$/.test(firstName)) {
    newErrors.firstName = 'First name should only contain letters';
  }
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
}

export function validateLastName(
  setErrors: React.Dispatch<React.SetStateAction<Partial<ProfileData>>>,
  lastName: string
) {
  const newErrors: Partial<ProfileData> = {};
  if (!lastName) {
    newErrors.lastName = 'First name is required';
  } else if (!/^[A-Za-z]+$/.test(lastName)) {
    newErrors.lastName = 'First name should only contain letters';
  }
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
}

export function validateDateOfBirth(
  setErrors: React.Dispatch<React.SetStateAction<Partial<ProfileData>>>,
  dateOfBirth: string
) {
  const newErrors: Partial<ProfileData> = {};
  const MIN_AGE: number = 13;
  if (!dateOfBirth) {
    newErrors.bd = 'Date of Birth is required';
  } else {
    const bdDate = new Date(dateOfBirth);
    const currentDate = new Date();
    const minAgeDate = new Date(
      currentDate.getFullYear() - MIN_AGE,
      currentDate.getMonth(),
      currentDate.getDate()
    );

    if (bdDate > minAgeDate) {
      newErrors.bd = 'You must be at least 13 years old';
    }
  }
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
}

export function validateEmail(
  setErrors: React.Dispatch<React.SetStateAction<Partial<ProfileData>>>,
  email: string
) {
  const newErrors: Partial<ProfileData> = {};
  if (!email) {
    newErrors.email = 'Email is required';
  } else if (!/^\S+@\S+\.\S+$/.test(email)) {
    newErrors.email = 'Invalid email format';
  }
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
}

export function validateNewPassword(
  setErrors: React.Dispatch<React.SetStateAction<Partial<ProfileData>>>,
  newPassword: string
) {
  const newErrors: Partial<ProfileData> = {};
  const MIN_PASSWORD_LENGTH: number = 8;
  if (!newPassword || newPassword.length < MIN_PASSWORD_LENGTH) {
    newErrors.password = 'Password should have at least 8 characters';
  } else if (
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[ -/:@[-`{-~])/.test(newPassword)
  ) {
    newErrors.password =
      'Password should have at least one uppercase letter, one lowercase letter, one number, and one special character (e.g., !@#$%^&*)';
  }
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
}

export function addressValidation(
  setErrors: React.Dispatch<React.SetStateAction<Partial<ProfileData>>>,
  city: string,
  streetName: string,
  postalCode: string,
  country: string | null
) {
  const newErrors: Partial<ProfileData> = {};
  if (!streetName) {
    newErrors.streetName = 'Street is required';
  }
  if (!city) {
    newErrors.city = 'City is required';
  } else if (!/^[A-Za-z\s]+$/.test(city)) {
    newErrors.city = 'City should only contain letters and spaces';
  }
  if (!validatePostalCode(postalCode, country || '')) {
    newErrors.postalCode =
      'Invalid postal code format for the selected country';
  }
  if (!country) {
    newErrors.country = 'Country is required';
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
}
