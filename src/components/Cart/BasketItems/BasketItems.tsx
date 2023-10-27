import { Box, Button, IconButton, Typography } from '@mui/material';
import React, { useContext } from 'react';
import styles from './BasketItems.module.css';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { СartQuantityContext } from '../../../context';
import { ICartData, ILineItem } from '../../../interfaces/auth.interface';
import PriceItem from './PriceItem/PriceItem';
import {
  changeQuantityItem,
  removeItem,
} from '../../../views/basket/Api-Busket';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function BasketItems({ data, setTotalPrice }: ICartData) {
  const { setCartQuantity } = useContext(СartQuantityContext);

  const handleDecrease = async (itemProduct: ILineItem) => {
    if (itemProduct.quantity > 1) {
      await changeQuantityItem(
        itemProduct,
        itemProduct.quantity - 1,
        setCartQuantity,
        setTotalPrice
      );
    }
  };

  const handleIncrease = async (itemProduct: ILineItem) => {
    await changeQuantityItem(
      itemProduct,
      itemProduct.quantity + 1,
      setCartQuantity,
      setTotalPrice
    );
  };

  const returnIdProduct = async (itemProduct: ILineItem) => {
    await removeItem(itemProduct, setCartQuantity, setTotalPrice);
  };

  return (
    <Box>
      <ToastContainer />
      {data.lineItems.map((item, index) => {
        return (
          <div key={index}>
            <Box display="flex" marginBottom="20px">
              <img
                src={item.variant.images[0].url}
                alt=""
                className={styles.image}
              />
              <Box
                sx={{
                  m: '10px',
                  ml: '30px',
                  width: '190px',
                  display: 'flex',
                  flexDirection: 'column',
                  color: '#555555',
                }}
              >
                <Typography sx={{ mb: '17px' }}>
                  {item.name['en-US']}
                </Typography>
                <PriceItem item={item} />
                <Box>
                  Q-ty:
                  <IconButton onClick={() => handleDecrease(item)}>
                    <RemoveIcon sx={{ fontSize: '1rem' }} />
                  </IconButton>
                  {item.quantity}
                  <IconButton onClick={() => handleIncrease(item)}>
                    <AddIcon sx={{ fontSize: '1rem' }} />
                  </IconButton>
                </Box>
                <Button
                  sx={{ mt: 'auto', p: '10px' }}
                  onClick={() => returnIdProduct(item)}
                >
                  Remove
                </Button>
              </Box>
            </Box>
          </div>
        );
      })}
    </Box>
  );
}
