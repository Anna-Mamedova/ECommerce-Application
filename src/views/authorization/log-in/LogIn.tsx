import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import { blueGrey } from '@mui/material/colors';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import styles from './LogIn.module.css';
import { getCustomer, getToken } from './Api-Login';

const grey = blueGrey['A700'];
const clearData = {
  email: '',
  password: '',
};

export default function SignUp() {
  const [data, setData] = useState(clearData);

  async function getCustometWithToken() {
    const token = await getToken({
      email: data.email,
      password: data.password,
    });
    const customer = await getCustomer({ accessToken: token.access_token });
    setData(clearData);
    return customer;
  }

  return (
    <Container maxWidth="xs">
      <div className={styles.container}>
        <Typography variant="h5">Log in</Typography>
        <TextField
          label="Email"
          variant="outlined"
          margin="normal"
          fullWidth
          value={data.email}
          onChange={(e) =>
            setData((prev) => ({ ...prev, email: e.target.value }))
          }
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={data.password}
          onChange={(e) =>
            setData((prev) => ({ ...prev, password: e.target.value }))
          }
        />
        <Button
          variant="contained"
          style={{ backgroundColor: grey }}
          fullWidth
          onClick={getCustometWithToken}
          sx={{ mt: 2 }}
        >
          Log in
        </Button>
        <Grid container>
          <Grid item sx={{ mt: 2 }}>
            <Link href="#" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}
