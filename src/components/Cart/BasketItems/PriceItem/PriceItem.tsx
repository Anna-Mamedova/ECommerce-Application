import { Box, Typography } from '@mui/material';
import React from 'react';
import { ILineItemData } from '../../../../interfaces/auth.interface';
import { formatCentsToCurrency } from '../../../../utils/format-to-cents';

export default function PriceItem({ item }: ILineItemData) {
  return (
    <div>
      {item.discountedPrice ? (
        <>
          <Typography
            sx={{
              textDecoration: 'line-through',
              color: 'red',
              mb: '3px',
            }}
          >
            Price:{' '}
            {item.price.discounted
              ? formatCentsToCurrency(item.price.discounted?.value.centAmount)
              : formatCentsToCurrency(item.price.value.centAmount)}{' '}
            $
          </Typography>
          <Box sx={{ mb: '10px' }}>
            Price:{' '}
            {formatCentsToCurrency(item.discountedPrice.value.centAmount)} $
          </Box>
        </>
      ) : (
        <>
          {item.price.discounted ? (
            <Box sx={{ mb: '10px' }}>
              Price:{' '}
              {formatCentsToCurrency(item.price.discounted?.value.centAmount)} $
            </Box>
          ) : (
            <Box sx={{ mb: '10px' }}>
              Price: {formatCentsToCurrency(item.price.value.centAmount)} $
            </Box>
          )}
        </>
      )}
      <Box sx={{ mb: '10px' }}>
        Sum: {formatCentsToCurrency(item.totalPrice.centAmount)} $
      </Box>
    </div>
  );
}
