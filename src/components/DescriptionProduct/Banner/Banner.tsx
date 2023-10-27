import { Typography, Box } from '@mui/material';
import React from 'react';
import { IBanner } from '../../../interfaces/detailedPage.interface';

export default function Banner({ color, label }: IBanner) {
  return (
    <>
      <Box
        sx={{
          backgroundColor: color,
          color: 'white',
          width: '60px',
          height: '30px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="body1">{label}</Typography>
      </Box>
    </>
  );
}
