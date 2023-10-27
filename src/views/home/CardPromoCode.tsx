import React from 'react';
import { Box, CardContent, CardHeader, Typography } from '@mui/material';
import Card from '@mui/material/Card';

export interface IPromoCodeData {
  title: string;
  promocode: string;
}

export default function CardPromoCode({ title, promocode }: IPromoCodeData) {
  return (
    <Card sx={{ height: '210px' }}>
      <CardHeader
        title={title}
        titleTypographyProps={{ align: 'center' }}
        subheaderTypographyProps={{ align: 'center' }}
        sx={{
          height: '100px',
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[200]
              : theme.palette.grey[700],
        }}
      />
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'baseline',
            mb: 2,
          }}
        >
          Promocode:
          <Typography component="h6" variant="h6" color="text.primary">
            {promocode}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
