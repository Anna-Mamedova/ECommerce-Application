import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import { blueGrey } from '@mui/material/colors';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import styles from './LogIn.module.css';

const grey = blueGrey['A700'];

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    console.log('Signing up:', email, password);
  };

  return (
    <Container maxWidth="xs">
      <div className={styles.container}>
        <Typography variant="h5">Log in</Typography>
        <TextField
          label="Email"
          variant="outlined"
          margin="normal"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="contained"
          style={{ backgroundColor: grey }}
          fullWidth
          onClick={handleSignUp}
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
