import { Formik, Form, Field } from 'formik';
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCustometWithToken } from '../../../utils/getCustomer';
import {
  Avatar,
  Button,
  Container,
  Grid,
  TextField,
  ThemeProvider,
  Typography,
  useTheme,
} from '@mui/material';
import { customInputTheme } from '../../../utils/custom-input-theme';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext, СartQuantityContext } from '../../../context';
import { formFieldsDefault } from '../../../utils/consts';
import PasswordVisibility from './PasswordVisibility';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import styles from './LogIn.module.css';
import { IData } from '../../../interfaces/auth.interface';
import { validationPasswordEmail } from './Validate-Login';

export default function LogIn() {
  const { setIsAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const outerTheme = useTheme();
  const [, setError] = useState<boolean>(false);
  const [, setErrorMessage] = useState(formFieldsDefault);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { setCartQuantity } = useContext(СartQuantityContext);

  function handleClickShowPassword() {
    setShowPassword((prev) => !prev);
  }

  const handleSubmit = (values: IData) => {
    getCustometWithToken(
      values,
      navigate,
      setIsAuth,
      setCartQuantity,
      setError,
      setErrorMessage
    );
  };

  return (
    <Container maxWidth="xs">
      <div className={styles.container}>
        <Avatar sx={{ m: 1, width: 46, height: 46, bgcolor: 'white' }}>
          <LockOpenIcon sx={{ color: 'black' }} />
        </Avatar>
        <Typography variant="h5">Log in</Typography>
        <Formik
          initialValues={formFieldsDefault}
          validationSchema={validationPasswordEmail}
          onSubmit={handleSubmit}
          validateOnChange={true}
          validateOnBlur={true}
        >
          {({ errors, touched }) => (
            <Form>
              <ThemeProvider theme={customInputTheme(outerTheme)}>
                <Field
                  name="email"
                  type="text"
                  label="Email"
                  variant="standard"
                  as={TextField}
                  fullWidth
                  margin="normal"
                  error={errors.email && touched.email}
                  helperText={errors.email && touched.email && errors.email}
                />
                <Field
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  label="Password"
                  as={TextField}
                  variant="standard"
                  fullWidth
                  margin="normal"
                  error={errors.password && touched.password}
                  helperText={
                    errors.password && touched.password && errors.password
                  }
                  InputProps={{
                    endAdornment: (
                      <PasswordVisibility
                        showPassword={showPassword}
                        handleClickShowPassword={handleClickShowPassword}
                      />
                    ),
                  }}
                />
              </ThemeProvider>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ mt: 2 }}
                size="large"
                style={{
                  backgroundColor: 'black',
                  color: 'white',
                }}
              >
                Log in
              </Button>
            </Form>
          )}
        </Formik>
        <ToastContainer />
        <Grid container>
          <Grid item sx={{ mt: 2 }}>
            <Link to="/registration" className={styles.link}>
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}
