import React from 'react';
import Typography from '@mui/material/Typography';
import { formatCentsToCurrency } from '../../utils/product';
import { Currency } from '../../enums/product.enum';
import { IProductPrice } from '../../interfaces/product.interface';

function ProductPrice({
  itemDiscount,
  currencyCode,
  itemPriceInCents,
}: IProductPrice) {
  const currencySymbol = currencyCode === Currency.USD ? '$' : '';

  return (
    <>
      <Typography sx={{ fontWeight: 'bold', color: '#da0000', mr: 1 }}>
        {formatCentsToCurrency(itemDiscount.value.centAmount)}
        {currencySymbol}
      </Typography>
      <Typography
        sx={{
          textDecoration: 'line-through',
          fontSize: '14px',
          color: '#bdbdbd',
        }}
      >
        {formatCentsToCurrency(itemPriceInCents)}
        {currencySymbol}
      </Typography>
    </>
  );
}

export default ProductPrice;
