import * as Yup from 'yup';

export const validationPasswordEmail = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required')
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email format'),
  password: Yup.string()
    .required('Password is required')
    .matches(/[A-Z]/, 'Password should contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password should contain at least one lowercase letter')
    .matches(/[0-9]/, 'Password must contain at least one digit (0-9)')
    .matches(
      /[!@#$%^&*]/,
      'Password must contain at least one special character'
    )
    .min(8, 'Password must be at least 8 characters long'),
});