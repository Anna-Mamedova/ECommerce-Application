import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import AddToCart from '../../DescriptionProduct/AddToCart/AddToCart';
import styles from './BasketInfo.module.css';
import { ICartData, ILineItem } from '../../../interfaces/auth.interface';
import { formatCentsToCurrency } from '../../../utils/format-to-cents';
import RemoveCart from '../RemoveCart/RemoveCart';
import { СartQuantityContext } from '../../../context';
import { PromoCode } from '../../../views/basket/Api-Busket';

export default function BasketInfo({
  data,
  setTotalPrice,
  totalPrice,
}: ICartData) {
  const { setCartQuantity } = useContext(СartQuantityContext);
  const [promoCode, setPromoCode] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPromoCode(event.target.value);
  };

  const ApplyPromoCode = async () => {
    setPromoCode('');
    await PromoCode(promoCode, setCartQuantity, setTotalPrice);
  };

  const totalAmount = data.lineItems.reduce((acc: number, item: ILineItem) => {
    const itemTotalPrice =
      item.quantity *
      (item.price?.discounted?.value.centAmount ||
        item.price?.value.centAmount ||
        0);
    return acc + itemTotalPrice;
  }, 0);

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
        <Typography variant="h5">
          {data && data.totalLineItemQuantity}
        </Typography>
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
        {data.lineItems.some((item) => item.discountedPrice) ? (
          <Box>
            <Typography
              variant="h6"
              sx={{
                textDecoration: 'line-through',
                color: 'red',
                mb: '3px',
              }}
            >
              {totalAmount ? formatCentsToCurrency(totalAmount) : ''}
            </Typography>
            <Typography variant="h5">
              {formatCentsToCurrency(totalPrice)}
            </Typography>
          </Box>
        ) : (
          <Typography variant="h5">
            {formatCentsToCurrency(totalPrice)}
          </Typography>
        )}
      </Box>
      <TextField
        type="text"
        label="Enter promocode number"
        variant="standard"
        fullWidth
        margin="normal"
        sx={{ mb: '20px' }}
        onChange={handleChange}
        value={promoCode}
        InputProps={{
          endAdornment: (
            <Button
              variant="text"
              size="small"
              style={{
                color: 'black',
                marginBottom: '5px',
                fontSize: '0.8rem',
              }}
              onClick={ApplyPromoCode}
            >
              Apply
            </Button>
          ),
        }}
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
        <Typography variant="h5">
          {formatCentsToCurrency(totalPrice)} $
        </Typography>
      </Box>
      <AddToCart name="Checkout" />
      <Box
        display="flex"
        sx={{
          color: '#555555',
          width: '100%',
          justifyContent: 'space-between',
        }}
      >
        <Link to="/catalog" className={styles.link}>
          Continue shopping
        </Link>
        <RemoveCart />
      </Box>
    </>
  );
}
