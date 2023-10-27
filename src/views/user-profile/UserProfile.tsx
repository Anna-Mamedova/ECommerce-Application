import React, { useState } from 'react';
import {
  Container,
  TextField,
  Grid,
  ThemeProvider,
  useTheme,
  Typography,
  Avatar,
  Tab,
  Box,
  IconButton,
  Button,
  Autocomplete,
  Dialog,
  DialogTitle,
  DialogActions,
  Radio,
} from '@mui/material';
import styles from './UserProfile.module.css';
import { customInputTheme } from '../../utils/custom-input-theme';
import BadgeIcon from '@mui/icons-material/Badge';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import PasswordVisibility from '../authorization/log-in/PasswordVisibility';
import { AddressData, ProfileData } from '../../types/user-profile.type';
import {
  addAddresses,
  changeAddress,
  removeAddresses,
  resetPassword,
  setDefaultBillingAddress,
  setDefaultShippingAddress,
  setNewDateOfBirth,
  setNewEmail,
  setNewFirstName,
  setNewLastName,
} from './Api-Userprofile';
import { ToastContainer } from 'react-toastify';
import {
  addressValidation,
  validateDateOfBirth,
  validateEmail,
  validateLastName,
  validateName,
  validateNewPassword,
} from './Validate-Profile';
import { Countries } from '../../enums/user-profile.enam';

export default function UserProfile() {
  const [userState, setUserState] = useState(
    JSON.parse(localStorage.getItem('customer') || '')
  );
  const [tabValue, setTabValue] = useState('1');
  const [showCurrentPassword, setShowCurrentPassword] =
    useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [changePassword, setChangePassword] = useState<boolean>(false);
  const [changeEmail, setChangeEmail] = useState<boolean>(false);
  const [changeName, setChangeName] = useState<boolean>(false);
  const [changeLastName, setChangeLastName] = useState<boolean>(false);
  const [changeBd, setChangeBd] = useState<boolean>(false);
  const [addNewShippingAddress, setAddNewShippingAddress] =
    useState<boolean>(false);
  const [addNewBillingAddress, setAddNewBillingAddress] =
    useState<boolean>(false);
  const [isEditAddress, setIsEditAddress] = useState<boolean>(false);
  const [selectedCountry, setSelectedCountry] = useState<string | null>('');
  const [selectedStreet, setSelectedStreet] = useState<string>('');
  const [selectedPostalCode, setSelectedPostalCode] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [selectedAddressId, setSelectedAddressId] = useState<string>('');
  const [firstName, setFirstName] = useState<string>(userState.firstName);
  const [lastName, setLastName] = useState<string>(userState.lastName);
  const [email, setEmail] = useState<string>(userState.email);
  const [dateOfBirth, setdateOfBirth] = useState<string>(userState.dateOfBirth);
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [errors, setErrors] = useState<Partial<ProfileData>>({});
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const addresses = userState.addresses;
  const billingAddressesId = userState.billingAddressIds;
  const shippingAddressesId = userState.shippingAddressIds;
  const defaultBillingAddressId = userState.defaultBillingAddressId;
  const defaultShippingAddressId = userState.defaultShippingAddressId;
  const shippingAddresses: AddressData[] = [];
  const billingAddresses: AddressData[] = [];

  addresses.forEach((address: AddressData) => {
    billingAddressesId.forEach((id: string) => {
      if (address.id === id) {
        billingAddresses.push(address);
      }
    });
    shippingAddressesId.forEach((id: string) => {
      if (address.id === id) {
        shippingAddresses.push(address);
      }
    });
  });

  const outerTheme = useTheme();

  const gridItemStyle = {
    marginTop: '-0.5rem',
    marginBottom: '-0.5rem',
  };

  function handleTabChange(event: React.SyntheticEvent, newTabValue: string) {
    setTabValue(newTabValue);
  }

  function handleCountryChange(
    event: React.ChangeEvent<object>,
    value: string | null
  ) {
    setSelectedCountry(
      value?.length === 2 ? Countries[value as keyof typeof Countries] : value
    );
  }

  return (
    <Container maxWidth="md" sx={{ mb: 4 }}>
      <div className={styles.container}>
        <Avatar sx={{ m: 1, width: 46, height: 46, bgcolor: 'white' }}>
          <BadgeIcon sx={{ color: 'black' }} />
        </Avatar>
        <ToastContainer />
        <Typography variant="h5">User profile</Typography>
        <ThemeProvider theme={customInputTheme(outerTheme)}>
          <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={tabValue}>
              <Box>
                <TabList
                  onChange={handleTabChange}
                  aria-label="lab API tabs example"
                  centered
                  textColor="inherit"
                  indicatorColor="primary"
                  TabIndicatorProps={{
                    sx: { backgroundColor: 'black' },
                  }}
                  sx={{
                    '& button': {
                      borderTopLeftRadius: 30,
                      borderTopRightRadius: 30,
                    },
                  }}
                >
                  <Tab label="Personal info" value="1" />
                  <Tab label="Addresses" value="2" />
                  <Tab label="Secure" value="3" />
                </TabList>
              </Box>
              <TabPanel value="1">
                <Grid container alignItems="flex-end" justifyContent="center">
                  <Grid item sm={6} xs={10}>
                    <TextField
                      label="First Name"
                      name="firstName"
                      variant="standard"
                      fullWidth
                      margin="normal"
                      value={firstName}
                      disabled={!changeName}
                      error={!!errors.firstName}
                      helperText={errors.firstName}
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        const { value } = event.target;
                        setFirstName(value);
                      }}
                    />
                  </Grid>
                  {!changeName && (
                    <Grid item xs={1} textAlign="end">
                      <IconButton onClick={() => setChangeName(true)}>
                        <DriveFileRenameOutlineOutlinedIcon />
                      </IconButton>
                    </Grid>
                  )}
                  {changeName && (
                    <>
                      <Grid item xs={0.75} textAlign="end">
                        <IconButton
                          onClick={async () => {
                            if (firstName !== userState.firstName) {
                              validateName(setErrors, firstName) &&
                                (await setNewFirstName(
                                  userState.version,
                                  firstName
                                ),
                                setChangeName(false)),
                                setUserState(
                                  JSON.parse(
                                    localStorage.getItem('customer') || ''
                                  )
                                );
                            } else {
                              setChangeName(false);
                            }
                          }}
                        >
                          <CheckOutlinedIcon />
                        </IconButton>
                      </Grid>
                      <Grid item xs={0.75} textAlign="end">
                        <IconButton
                          onClick={() => {
                            setChangeName(false);
                            setFirstName(userState.firstName);
                            errors.firstName = '';
                          }}
                        >
                          <CancelOutlinedIcon />
                        </IconButton>
                      </Grid>
                    </>
                  )}
                  <Grid item sm={6} xs={10}>
                    <TextField
                      label="Last Name"
                      name="lastName"
                      variant="standard"
                      fullWidth
                      margin="normal"
                      value={lastName}
                      error={!!errors.lastName}
                      helperText={errors.lastName}
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        const { value } = event.target;
                        setLastName(value);
                      }}
                      disabled={!changeLastName}
                    />
                  </Grid>
                  {!changeLastName && (
                    <Grid item xs={1} textAlign="end">
                      <IconButton onClick={() => setChangeLastName(true)}>
                        <DriveFileRenameOutlineOutlinedIcon />
                      </IconButton>
                    </Grid>
                  )}
                  {changeLastName && (
                    <>
                      <Grid item xs={0.75} textAlign="end">
                        <IconButton
                          onClick={async () => {
                            if (lastName !== userState.lastName) {
                              validateLastName(setErrors, lastName) &&
                                (await setNewLastName(
                                  userState.version,
                                  lastName
                                ),
                                setChangeLastName(false)),
                                setUserState(
                                  JSON.parse(
                                    localStorage.getItem('customer') || ''
                                  )
                                );
                            } else {
                              setChangeLastName(false);
                            }
                          }}
                        >
                          <CheckOutlinedIcon />
                        </IconButton>
                      </Grid>
                      <Grid item xs={0.75} textAlign="end">
                        <IconButton
                          onClick={() => {
                            setChangeLastName(false);
                            setLastName(userState.lastName);
                            errors.lastName = '';
                          }}
                        >
                          <CancelOutlinedIcon />
                        </IconButton>
                      </Grid>
                    </>
                  )}
                  <Grid item sm={6} xs={10}>
                    <TextField
                      label="Date of Birth"
                      name="bd"
                      type="date"
                      variant="standard"
                      fullWidth
                      margin="normal"
                      error={!!errors.bd}
                      helperText={errors.bd}
                      InputLabelProps={{ shrink: true }}
                      value={dateOfBirth}
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        const { value } = event.target;
                        setdateOfBirth(value);
                      }}
                      disabled={!changeBd}
                    />
                  </Grid>
                  {!changeBd && (
                    <Grid item xs={1} textAlign="end">
                      <IconButton onClick={() => setChangeBd(true)}>
                        <DriveFileRenameOutlineOutlinedIcon />
                      </IconButton>
                    </Grid>
                  )}
                  {changeBd && (
                    <>
                      <Grid item xs={0.75} textAlign="end">
                        <IconButton
                          onClick={async () => {
                            if (dateOfBirth !== userState.dateOfBirth) {
                              validateDateOfBirth(setErrors, dateOfBirth) &&
                                (await setNewDateOfBirth(
                                  userState.version,
                                  dateOfBirth
                                ),
                                setUserState(
                                  JSON.parse(
                                    localStorage.getItem('customer') || ''
                                  )
                                ),
                                setChangeBd(false));
                            } else {
                              setChangeBd(false);
                            }
                          }}
                        >
                          <CheckOutlinedIcon />
                        </IconButton>
                      </Grid>
                      <Grid item xs={0.75} textAlign="end">
                        <IconButton
                          onClick={() => {
                            setChangeBd(false);
                            setdateOfBirth(userState.dateOfBirth);
                            errors.bd = '';
                          }}
                        >
                          <CancelOutlinedIcon />
                        </IconButton>
                      </Grid>
                    </>
                  )}
                </Grid>
              </TabPanel>
              <TabPanel value="2">
                <Grid container alignItems="flex-end" justifyContent="center">
                  <Grid item xs={11} sm={7}>
                    <Typography
                      sx={{ fontWeight: 'bold' }}
                      variant="h6"
                      align="left"
                      gutterBottom
                    >
                      Billing Addresses:
                    </Typography>
                  </Grid>
                  <Grid item xs={1} textAlign="end">
                    <IconButton
                      onClick={() => {
                        setSelectedCity('');
                        setSelectedCountry(null);
                        setSelectedPostalCode('');
                        setSelectedStreet('');
                        setSelectedAddressId('');
                        setIsEditAddress(true);
                        setAddNewShippingAddress(false);
                        setAddNewBillingAddress(true);
                      }}
                    >
                      <AddCircleOutlineIcon />
                    </IconButton>
                  </Grid>
                </Grid>
                {billingAddresses.map((address, i) => {
                  return (
                    <Grid
                      container
                      alignItems="center"
                      justifyContent="center"
                      key={i}
                    >
                      <Grid item xs={1.5} sm={1} textAlign="start">
                        <Radio
                          name="default-billing"
                          size="small"
                          value={address.id}
                          checked={address.id === defaultBillingAddressId}
                          sx={{
                            color: 'black',
                            '&.Mui-checked': {
                              color: 'black',
                            },
                          }}
                          onChange={async () => {
                            await setDefaultBillingAddress(
                              userState.version,
                              address.id
                            );
                            setUserState(
                              JSON.parse(localStorage.getItem('customer') || '')
                            );
                          }}
                        />
                      </Grid>
                      <Grid item xs={8.5} sm={5}>
                        {address.id === defaultBillingAddressId && (
                          <Typography
                            variant="caption"
                            align="left"
                            sx={{
                              backgroundColor: 'lightgray',
                              color: 'white',
                              padding: 0.3,
                              borderRadius: 30,
                            }}
                          >
                            default
                          </Typography>
                        )}
                        <Typography variant="body1" align="left">
                          {address.streetName}, {address.postalCode}{' '}
                          {address.city}, {address.country}
                        </Typography>
                      </Grid>
                      <Grid item xs={1} textAlign="end">
                        <IconButton
                          onClick={() => {
                            setIsEditAddress(true);
                            setSelectedCity(address.city);
                            setSelectedCountry(
                              address.country?.length === 2
                                ? Countries[
                                    address.country as keyof typeof Countries
                                  ]
                                : address.country
                            );
                            setSelectedPostalCode(address.postalCode);
                            setSelectedStreet(address.streetName);
                            setSelectedAddressId(address.id);
                            setAddNewBillingAddress(false);
                            setAddNewShippingAddress(false);
                            errors.city = '';
                            errors.country = '';
                            errors.postalCode = '';
                            errors.streetName = '';
                          }}
                        >
                          <DriveFileRenameOutlineOutlinedIcon />
                        </IconButton>
                      </Grid>
                      <Grid item xs={1} textAlign="end">
                        <IconButton
                          onClick={() => {
                            setIsEditAddress(false);
                            setOpenAlert(true);
                            setSelectedAddressId(address.id);
                          }}
                        >
                          <DeleteOutlineOutlinedIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                  );
                })}
                <Grid
                  container
                  alignItems="flex-end"
                  justifyContent="center"
                  mt={4}
                >
                  <Grid item xs={11} sm={7}>
                    <Typography
                      sx={{ fontWeight: 'bold' }}
                      variant="h6"
                      align="left"
                      gutterBottom
                    >
                      Shipping Addresses:
                    </Typography>
                  </Grid>
                  <Grid item xs={1} textAlign="end">
                    <IconButton
                      onClick={() => {
                        setSelectedCity('');
                        setSelectedCountry(null);
                        setSelectedPostalCode('');
                        setSelectedStreet('');
                        setSelectedAddressId('');
                        setIsEditAddress(true);
                        setAddNewShippingAddress(true);
                        setAddNewBillingAddress(false);
                      }}
                    >
                      <AddCircleOutlineIcon />
                    </IconButton>
                  </Grid>
                </Grid>
                {shippingAddresses.map((address, i) => {
                  return (
                    <Grid
                      container
                      alignItems="center"
                      justifyContent="center"
                      key={i}
                    >
                      <Grid item xs={1.5} sm={1} textAlign="start">
                        <Radio
                          name="default-shipping"
                          size="small"
                          checked={address.id === defaultShippingAddressId}
                          value={address.id}
                          sx={{
                            color: 'black',
                            '&.Mui-checked': {
                              color: 'black',
                            },
                          }}
                          onChange={async () => {
                            await setDefaultShippingAddress(
                              userState.version,
                              address.id
                            );
                            setUserState(
                              JSON.parse(localStorage.getItem('customer') || '')
                            );
                          }}
                        />
                      </Grid>
                      <Grid item xs={8.5} sm={5}>
                        {address.id === defaultShippingAddressId && (
                          <Typography
                            variant="caption"
                            align="left"
                            sx={{
                              backgroundColor: 'lightgray',
                              color: 'white',
                              padding: 0.3,
                              borderRadius: 30,
                            }}
                          >
                            default
                          </Typography>
                        )}
                        <Typography variant="body1" align="left">
                          {address.streetName}, {address.postalCode}{' '}
                          {address.city}, {address.country}
                        </Typography>
                      </Grid>
                      <Grid item xs={1} textAlign="end">
                        <IconButton
                          onClick={() => {
                            setIsEditAddress(true);
                            setSelectedCity(address.city);
                            setSelectedCountry(
                              address.country?.length === 2
                                ? Countries[
                                    address.country as keyof typeof Countries
                                  ]
                                : address.country
                            );
                            setSelectedPostalCode(address.postalCode);
                            setSelectedStreet(address.streetName);
                            setSelectedAddressId(address.id);
                            setAddNewBillingAddress(false);
                            setAddNewShippingAddress(false);
                            errors.city = '';
                            errors.country = '';
                            errors.postalCode = '';
                            errors.streetName = '';
                          }}
                        >
                          <DriveFileRenameOutlineOutlinedIcon />
                        </IconButton>
                      </Grid>
                      <Grid item xs={1} textAlign="end">
                        <IconButton
                          onClick={() => {
                            setIsEditAddress(false);
                            setOpenAlert(true);
                            setSelectedAddressId(address.id);
                          }}
                        >
                          <DeleteOutlineOutlinedIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                  );
                })}
                {isEditAddress && (
                  <Grid
                    container
                    alignItems="flex-end"
                    justifyContent="center"
                    sx={{ tran: 100 }}
                  >
                    <Grid item xs={11.5} sm={7.5} mt={3}>
                      <Typography
                        sx={{ fontWeight: 'bold' }}
                        variant="h6"
                        align="left"
                        gutterBottom
                      >
                        {selectedAddressId
                          ? 'Set changes:'
                          : addNewShippingAddress
                          ? 'Add new shipping address:'
                          : 'Add new billing address:'}
                      </Typography>
                    </Grid>
                    <Grid item xs={11.5} sm={7.5} sx={gridItemStyle}>
                      <TextField
                        label="Street"
                        name="street"
                        fullWidth
                        margin="normal"
                        variant="standard"
                        error={!!errors.streetName}
                        helperText={errors.streetName}
                        value={selectedStreet}
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>
                        ) => {
                          const { value } = event.target;
                          setSelectedStreet(value);
                        }}
                      />
                    </Grid>
                    <Grid item xs={11.5} sm={7.5} sx={gridItemStyle}>
                      <TextField
                        label="City"
                        name="city"
                        fullWidth
                        margin="normal"
                        variant="standard"
                        error={!!errors.city}
                        helperText={errors.city}
                        value={selectedCity}
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>
                        ) => {
                          const { value } = event.target;
                          setSelectedCity(value);
                        }}
                      />
                    </Grid>
                    <Grid item xs={11.5} sm={7.5} sx={gridItemStyle}>
                      <TextField
                        label="Postal Code"
                        name="postalCode"
                        fullWidth
                        margin="normal"
                        variant="standard"
                        error={!!errors.postalCode}
                        helperText={errors.postalCode}
                        value={selectedPostalCode}
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>
                        ) => {
                          const { value } = event.target;
                          setSelectedPostalCode(value);
                        }}
                      />
                    </Grid>
                    <Grid item xs={11.5} sm={7.5} sx={gridItemStyle}>
                      <Autocomplete
                        id="country"
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
                        value={
                          selectedCountry?.length === 2
                            ? Countries[
                                selectedCountry as keyof typeof Countries
                              ]
                            : selectedCountry
                        }
                        onChange={handleCountryChange}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Country"
                            name="country"
                            variant="standard"
                            fullWidth
                            margin="normal"
                            error={!!errors.country}
                            helperText={errors.country}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={11.5} sm={7.5} sx={gridItemStyle}>
                      <Button
                        variant="outlined"
                        style={{ borderColor: 'black', color: 'black' }}
                        sx={{ mt: 3 }}
                        size="small"
                        onClick={async () => {
                          selectedAddressId
                            ? addressValidation(
                                setErrors,
                                selectedCity,
                                selectedStreet,
                                selectedPostalCode,
                                selectedCountry
                              ) &&
                              (await changeAddress(
                                userState.version,
                                selectedAddressId,
                                selectedCity,
                                selectedStreet,
                                selectedPostalCode,
                                selectedCountry
                              ),
                              setIsEditAddress(false),
                              setUserState(
                                JSON.parse(
                                  localStorage.getItem('customer') || ''
                                )
                              ))
                            : addNewBillingAddress
                            ? addressValidation(
                                setErrors,
                                selectedCity,
                                selectedStreet,
                                selectedPostalCode,
                                selectedCountry
                              ) &&
                              (await addAddresses(
                                userState.version,
                                selectedCity,
                                selectedStreet,
                                selectedPostalCode,
                                selectedCountry,
                                'billing'
                              ),
                              setIsEditAddress(false),
                              setUserState(
                                JSON.parse(
                                  localStorage.getItem('customer') || ''
                                )
                              ))
                            : addressValidation(
                                setErrors,
                                selectedCity,
                                selectedStreet,
                                selectedPostalCode,
                                selectedCountry
                              ) &&
                              (await addAddresses(
                                userState.version,
                                selectedCity,
                                selectedStreet,
                                selectedPostalCode,
                                selectedCountry,
                                'shipping'
                              ),
                              setIsEditAddress(false),
                              setUserState(
                                JSON.parse(
                                  localStorage.getItem('customer') || ''
                                )
                              ));
                        }}
                      >
                        Save
                      </Button>
                      <Button
                        variant="outlined"
                        style={{ borderColor: 'black', color: 'black' }}
                        sx={{ mt: 3, ml: 2 }}
                        size="small"
                        onClick={() => {
                          setIsEditAddress(false);
                          setAddNewBillingAddress(false);
                          setAddNewShippingAddress(false);
                          setSelectedCity('');
                          setSelectedCountry('');
                          setSelectedPostalCode('');
                          setSelectedStreet('');
                          setSelectedAddressId('');
                          errors.city = '';
                          errors.country = '';
                          errors.postalCode = '';
                          errors.streetName = '';
                        }}
                      >
                        Cancel
                      </Button>
                    </Grid>
                  </Grid>
                )}
              </TabPanel>
              <TabPanel value="3">
                <Grid container alignItems="flex-end" justifyContent="center">
                  <Grid item sm={6} xs={10}>
                    <TextField
                      label="Email"
                      name="email"
                      variant="standard"
                      fullWidth
                      margin="normal"
                      error={!!errors.email}
                      helperText={errors.email}
                      value={email}
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        const { value } = event.target;
                        setEmail(value);
                      }}
                      disabled={!changeEmail}
                    />
                  </Grid>
                  {!changeEmail && (
                    <Grid item xs={1} textAlign="end">
                      <IconButton onClick={() => setChangeEmail(true)}>
                        <DriveFileRenameOutlineOutlinedIcon />
                      </IconButton>
                    </Grid>
                  )}
                  {changeEmail && (
                    <>
                      <Grid item xs={0.75} textAlign="end">
                        <IconButton
                          onClick={async () => {
                            if (email !== userState.email) {
                              validateEmail(setErrors, email) &&
                                (await setNewEmail(userState.version, email),
                                setUserState(
                                  JSON.parse(
                                    localStorage.getItem('customer') || ''
                                  )
                                ),
                                setChangeEmail(false));
                            } else {
                              setChangeEmail(false);
                            }
                          }}
                        >
                          <CheckOutlinedIcon />
                        </IconButton>
                      </Grid>
                      <Grid item xs={0.75} textAlign="end">
                        <IconButton
                          onClick={() => {
                            setChangeEmail(false);
                            setEmail(userState.email);
                            errors.email = '';
                          }}
                        >
                          <CancelOutlinedIcon />
                        </IconButton>
                      </Grid>
                    </>
                  )}
                  <Grid item xs={11} sm={7} mt={4}>
                    <Typography
                      sx={{ fontWeight: 'bold' }}
                      variant="h6"
                      align="left"
                      gutterBottom
                    >
                      Reset password:
                    </Typography>
                  </Grid>
                  <Grid item sm={7} xs={11}>
                    <TextField
                      label="Current password"
                      name="password"
                      type={showCurrentPassword ? 'text' : 'password'}
                      variant="standard"
                      fullWidth
                      margin="normal"
                      disabled={!changePassword}
                      value={currentPassword}
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        const { value } = event.target;
                        setCurrentPassword(value);
                      }}
                      InputProps={{
                        endAdornment: (
                          <PasswordVisibility
                            showPassword={showCurrentPassword}
                            handleClickShowPassword={() =>
                              setShowCurrentPassword(!showCurrentPassword)
                            }
                          />
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item sm={7} xs={11}>
                    <TextField
                      label="New password"
                      name="password"
                      type={showNewPassword ? 'text' : 'password'}
                      variant="standard"
                      fullWidth
                      margin="normal"
                      disabled={!changePassword}
                      value={newPassword}
                      error={!!errors.password}
                      helperText={errors.password}
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        const { value } = event.target;
                        setNewPassword(value);
                      }}
                      InputProps={{
                        endAdornment: (
                          <PasswordVisibility
                            showPassword={showNewPassword}
                            handleClickShowPassword={() =>
                              setShowNewPassword(!showNewPassword)
                            }
                          />
                        ),
                      }}
                    />
                  </Grid>
                  {!changePassword && (
                    <Grid item sm={7} xs={11} textAlign="start">
                      <IconButton onClick={() => setChangePassword(true)}>
                        <DriveFileRenameOutlineOutlinedIcon />
                      </IconButton>
                    </Grid>
                  )}
                  {changePassword && (
                    <Grid item sm={7} xs={11} textAlign="start">
                      <IconButton
                        onClick={async () => {
                          validateNewPassword(setErrors, newPassword) &&
                            (await resetPassword(
                              userState.version,
                              newPassword,
                              currentPassword
                            ),
                            setUserState(
                              JSON.parse(localStorage.getItem('customer') || '')
                            ),
                            setChangePassword(false)),
                            setCurrentPassword('');
                          setNewPassword('');
                        }}
                      >
                        <CheckOutlinedIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          setChangePassword(false);
                          setCurrentPassword('');
                          setNewPassword('');
                          errors.password = '';
                        }}
                      >
                        <CancelOutlinedIcon />
                      </IconButton>
                    </Grid>
                  )}
                </Grid>
              </TabPanel>
            </TabContext>
          </Box>
        </ThemeProvider>
        <Dialog
          open={openAlert}
          onClose={() => {
            setOpenAlert(false);
            setSelectedAddressId('');
          }}
        >
          <DialogTitle>{'Do you want to remove this address?'}</DialogTitle>
          <DialogActions>
            <Button
              onClick={() => {
                setOpenAlert(false);
                setSelectedAddressId('');
              }}
              sx={{ color: 'black' }}
            >
              No
            </Button>
            <Button
              onClick={async () => {
                await removeAddresses(userState.version, selectedAddressId),
                  setOpenAlert(false),
                  setSelectedAddressId(''),
                  setUserState(
                    JSON.parse(localStorage.getItem('customer') || '')
                  );
              }}
              sx={{ color: 'black' }}
            >
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </Container>
  );
}
