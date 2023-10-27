import { Box, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './EmptyCard.module.css';

export default function EmptyCartMessage() {
  return (
    <Box
      sx={{
        mt: '20vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{ width: '280px' }}
        component="img"
        src="https://cdn.dribbble.com/users/351694/screenshots/10760065/media/c93e509e870484db932891b96447bd85.gif"
      />
      <Typography align="center" variant="h6">
        Your cart is empty
      </Typography>
      <Link to="/catalog" className={styles.link}>
        continue shopping
      </Link>
    </Box>
  );
}
