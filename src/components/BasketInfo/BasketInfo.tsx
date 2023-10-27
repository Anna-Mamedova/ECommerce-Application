import { Box, TextField, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import AddToCart from '../DescriptionProduct/AddToCart/AddToCart';
import styles from './BasketInfo.module.css';

export default function BasketInfo() {
  return (
    <>
      <Typography variant="h4" sx={{ mb: '20px', mt: '13vh' }}>
        Your Order:
      </Typography>
      <Box
        display="flex"
        sx={{
          color: '#555555',
          width: '100%',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="h5" sx={{ mb: '10px' }}>
          Quantity of goods:
        </Typography>
        <Typography variant="h5">8</Typography>
      </Box>
      <Box
        display="flex"
        sx={{
          color: '#555555',
          width: '100%',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="h5" sx={{ mb: '10px' }}>
          Cost order:
        </Typography>
        <Typography variant="h5">1378$</Typography>
      </Box>
      <TextField
        type="text"
        label="Enter promocode number"
        variant="standard"
        fullWidth
        margin="normal"
        sx={{ mb: '20px' }}
      />
      <Box
        display="flex"
        sx={{
          color: '#555555',
          width: '100%',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="h5" sx={{ mb: '10px' }}>
          Amount to be paid:
        </Typography>
        <Typography variant="h5">1000$</Typography>
      </Box>
      <AddToCart name="Checkout" />
      <Link to="/catalog" className={styles.link}>
        Continue shopping
      </Link>
    </>
  );
}
