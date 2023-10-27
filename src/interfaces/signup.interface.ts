export interface ISignUpData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  bd: string;
  billingStreet: string;
  billingCity: string;
  billingPostalCode: string;
  billingCountry: string;
  shippingStreet: string;
  shippingCity: string;
  shippingPostalCode: string;
  shippingCountry: string;
  sameAddress: boolean;
}

export interface IAddAddress {
  streetName: string;
  postalCode: string;
  city: string;
  country: string;
  type: string;
}

export interface ISignUpState {
  signUpData: ISignUpData;
  customerBillingAddress: {
    streetName: string;
    city: string;
    postalCode: string;
    country: string;
    type: string;
  };
  customerShippingAddress: {
    streetName: string;
    city: string;
    postalCode: string;
    country: string;
    type: string;
  };
  selectedBillingCountry: string | null;
  selectedShippingCountry: string | null;
  defaultBillingAddress: boolean;
  defaultShippingAddress: boolean;
}