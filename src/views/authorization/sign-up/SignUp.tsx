import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Container,
  TextField,
  Button,
  Typography,
  Autocomplete,
  Grid,
  ThemeProvider,
  useTheme,
  FormControlLabel,
  Checkbox,
  Avatar,
} from '@mui/material';
import Paper from '@mui/material/Paper';
import { ISignUpData } from '../../../interfaces/signup.interface';
import { customInputTheme } from '../../../utils/custom-input-theme';
import styles from './SignUp.module.css';
import { handleSubmit } from './Api-Signup';
import { ToastContainer } from 'react-toastify';
import { AuthContext, СartQuantityContext } from '../../../context';
import { Person } from '@mui/icons-material';
import PasswordVisibility from '../log-in/PasswordVisibility';

export default function SignUp() {
  const [signUpData, setSignUpData] = useState<ISignUpData>({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    bd: '',
    billingStreet: '',
    billingCity: '',
    billingPostalCode: '',
    billingCountry: '',
    shippingStreet: '',
    shippingCity: '',
    shippingPostalCode: '',
    shippingCountry: '',
    sameAddress: false,
  });

  const customerBillingAddress = {
    streetName: signUpData.billingStreet,
    city: signUpData.billingCity,
    postalCode: signUpData.billingPostalCode,
    country: signUpData.billingCountry.slice(
      signUpData.billingCountry.indexOf('(') + 1,
      -1
    ),
    type: 'Billing',
  };

  const customerShippingAddress = {
    streetName: signUpData.shippingStreet,
    city: signUpData.shippingCity,
    postalCode: signUpData.shippingPostalCode,
    country: signUpData.shippingCountry.slice(
      signUpData.shippingCountry.indexOf('(') + 1,
      -1
    ),
    type: 'Shipping',
  };

  const [errors, setErrors] = useState<Partial<ISignUpData>>({});
  const [selectedBillingCountry, setSelectedBillingCountry] = useState<
    string | null
  >(null);
  const [selectedShippingCountry, setSelectedShippingCountry] = useState<
    string | null
  >(null);
  const [defaultBillingAddress, setdefaultBillingAddress] = useState(false);
  const [defaultShippingAddress, setdefaultShippingAddress] = useState(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { setIsAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const { setCartQuantity } = useContext(СartQuantityContext);

  const outerTheme = useTheme();

  function handleClickShowPassword() {
    setShowPassword((prev) => !prev);
  }

  const signUpState = {
    signUpData,
    customerBillingAddress,
    customerShippingAddress,
    selectedBillingCountry,
    selectedShippingCountry,
    defaultBillingAddress,
    defaultShippingAddress,
  };

  const gridItemStyle = {
    marginTop: '-0.5rem',
    marginBottom: '-0.5rem',
  };

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setSignUpData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  function handleBillingCountryChange(
    event: React.ChangeEvent<object>,
    value: string | null
  ) {
    setSelectedBillingCountry(value);
    if (value) {
      signUpData.billingCountry = value;
    }
  }

  function handleShippingCountryChange(
    event: React.ChangeEvent<object>,
    value: string | null
  ) {
    setSelectedShippingCountry(value);
    if (value) {
      signUpData.shippingCountry = value;
    }
  }

  return (
    <Container maxWidth="md" sx={{ mb: 4 }}>
      <Paper
        variant="outlined"
        sx={{
          my: { xs: 3, md: 6 },
          p: { xs: 2, md: 3 },
          bgcolor: '#f6f6f63b',
          boxShadow: '0 2px 7px -4px #222;',
        }}
      >
        <div className={styles.container}>
          <Avatar sx={{ m: 1, width: 46, height: 46, bgcolor: 'white' }}>
            <Person sx={{ color: 'black' }} />
          </Avatar>
          <Typography variant="h5">Sign Up</Typography>
          <form
            onSubmit={(event) =>
              handleSubmit(
                event,
                signUpState,
                setErrors,
                navigate,
                setIsAuth,
                setCartQuantity
              )
            }
          >
            <ThemeProvider theme={customInputTheme(outerTheme)}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} sx={gridItemStyle}>
                  <TextField
                    label="Email"
                    name="email"
                    variant="standard"
                    value={signUpData.email}
                    onChange={handleInputChange}
                    error={!!errors.email}
                    helperText={errors.email}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} sm={6} sx={gridItemStyle}>
                  <TextField
                    label="Password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    variant="standard"
                    value={signUpData.password}
                    onChange={handleInputChange}
                    error={!!errors.password}
                    helperText={errors.password}
                    fullWidth
                    margin="normal"
                    InputProps={{
                      endAdornment: (
                        <PasswordVisibility
                          showPassword={showPassword}
                          handleClickShowPassword={handleClickShowPassword}
                        />
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} sx={gridItemStyle}>
                  <TextField
                    label="First Name"
                    name="firstName"
                    variant="standard"
                    value={signUpData.firstName}
                    onChange={handleInputChange}
                    error={!!errors.firstName}
                    helperText={errors.firstName}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} sm={6} sx={gridItemStyle}>
                  <TextField
                    label="Last Name"
                    name="lastName"
                    variant="standard"
                    value={signUpData.lastName}
                    onChange={handleInputChange}
                    error={!!errors.lastName}
                    helperText={errors.lastName}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} sx={gridItemStyle}>
                  <TextField
                    label="Date of Birth"
                    name="bd"
                    type="date"
                    variant="standard"
                    value={signUpData.bd}
                    onChange={handleInputChange}
                    error={!!errors.bd}
                    helperText={errors.bd}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="sameAddress"
                        checked={signUpData.sameAddress}
                        onChange={() =>
                          setSignUpData({
                            ...signUpData,
                            sameAddress: !signUpData.sameAddress,
                          })
                        }
                        sx={{
                          color: 'gray',
                          '&.Mui-checked': {
                            color: 'black',
                          },
                        }}
                      />
                    }
                    label="Use same address for billing and shipping"
                  />
                </Grid>
                <Grid item xs={12} sx={gridItemStyle}>
                  <Typography
                    sx={{ fontWeight: 'bold' }}
                    variant="h6"
                    align="center"
                    gutterBottom
                  >
                    Billing Address
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} sx={gridItemStyle}>
                  <TextField
                    label=" Street"
                    name="billingStreet"
                    value={signUpData.billingStreet}
                    onChange={handleInputChange}
                    error={!!errors.billingStreet}
                    helperText={errors.billingStreet}
                    fullWidth
                    margin="normal"
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={12} sm={6} sx={gridItemStyle}>
                  <TextField
                    label=" City"
                    name="billingCity"
                    value={signUpData.billingCity}
                    onChange={handleInputChange}
                    error={!!errors.billingCity}
                    helperText={errors.billingCity}
                    fullWidth
                    margin="normal"
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={12} sm={6} sx={gridItemStyle}>
                  <TextField
                    label=" Postal Code"
                    name="billingPostalCode"
                    value={signUpData.billingPostalCode}
                    onChange={handleInputChange}
                    error={!!errors.billingPostalCode}
                    helperText={errors.billingPostalCode}
                    fullWidth
                    margin="normal"
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={12} sm={6} sx={gridItemStyle}>
                  <Autocomplete
                    id="billing-country"
                    options={[
                      'Germany (DE)',
                      'France (FR)',
                      'United Kingdom (GB)',
                      'Italy (IT)',
                      'Spain (ES)',
                      'Ukraine (UA)',
                      'Poland (PL)',
                      'Sweden (SE)',
                      'Norway (NO)',
                      'Finland (FI)',
                      'Denmark (DK)',
                      'Switzerland (CH)',
                      'Austria (AT)',
                      'Greece (GR)',
                      'Portugal (PT)',
                    ]}
                    value={selectedBillingCountry}
                    onChange={handleBillingCountryChange}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label=" Country"
                        name="billing-country"
                        variant="standard"
                        error={!!errors.billingCountry}
                        helperText={errors.billingCountry}
                        fullWidth
                        margin="normal"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="default billing address"
                        checked={defaultBillingAddress}
                        onChange={() =>
                          setdefaultBillingAddress(!defaultBillingAddress)
                        }
                        sx={{
                          color: 'gray',
                          '&.Mui-checked': {
                            color: 'black',
                          },
                        }}
                      />
                    }
                    label="It is default billing address?"
                  />
                </Grid>
                <Grid item xs={12} sx={gridItemStyle}>
                  <Typography
                    sx={{ fontWeight: 'bold' }}
                    variant="h6"
                    align="center"
                    gutterBottom
                  >
                    Shipping Address
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} sx={gridItemStyle}>
                  <TextField
                    label="Street"
                    name="shippingStreet"
                    value={signUpData.shippingStreet}
                    onChange={handleInputChange}
                    fullWidth
                    error={!!errors.shippingStreet}
                    helperText={errors.shippingStreet}
                    margin="normal"
                    variant="standard"
                    disabled={signUpData.sameAddress}
                  />
                </Grid>
                <Grid item xs={12} sm={6} sx={gridItemStyle}>
                  <TextField
                    label="City"
                    name="shippingCity"
                    value={signUpData.shippingCity}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    variant="standard"
                    disabled={signUpData.sameAddress}
                    error={!!errors.shippingCity}
                    helperText={errors.shippingCity}
                  />
                </Grid>
                <Grid item xs={12} sm={6} sx={gridItemStyle}>
                  <TextField
                    label=" Postal Code"
                    name="shippingPostalCode"
                    value={signUpData.shippingPostalCode}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    variant="standard"
                    disabled={signUpData.sameAddress}
                    error={!!errors.shippingPostalCode}
                    helperText={errors.shippingPostalCode}
                  />
                </Grid>
                <Grid item xs={12} sm={6} sx={gridItemStyle}>
                  <Autocomplete
                    id="shipping-country"
                    options={[
                      'Germany (DE)',
                      'France (FR)',
                      'United Kingdom (GB)',
                      'Italy (IT)',
                      'Spain (ES)',
                      'Ukraine (UA)',
                      'Poland (PL)',
                      'Sweden (SE)',
                      'Norway (NO)',
                      'Finland (FI)',
                      'Denmark (DK)',
                      'Switzerland (CH)',
                      'Austria (AT)',
                      'Greece (GR)',
                      'Portugal (PT)',
                    ]}
                    value={selectedShippingCountry}
                    disabled={signUpData.sameAddress}
                    onChange={handleShippingCountryChange}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Country"
                        name="shipping-country"
                        variant="standard"
                        error={!!errors.shippingCountry}
                        helperText={errors.shippingCountry}
                        fullWidth
                        margin="normal"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="default shipping address"
                        checked={defaultShippingAddress}
                        onChange={() =>
                          setdefaultShippingAddress(!defaultShippingAddress)
                        }
                        sx={{
                          color: 'gray',
                          '&.Mui-checked': {
                            color: 'black',
                          },
                        }}
                      />
                    }
                    label="It is default Shipping address?"
                  />
                </Grid>
              </Grid>
            </ThemeProvider>
            <Button
              variant="contained"
              style={{ backgroundColor: 'black' }}
              type="submit"
              fullWidth
              sx={{ mt: 2 }}
              size="large"
            >
              Sign Up
            </Button>
          </form>
          <ToastContainer />
          <Grid container>
            <Grid item sx={{ mt: 2, mb: 2 }}>
              <Link to="/login" className={styles.link}>
                {'Have an account? Log In'}
              </Link>
            </Grid>
          </Grid>
        </div>
      </Paper>
    </Container>
  );
}
