import { ThemeProvider } from '@emotion/react';
import { Grid, useTheme } from '@mui/material';
import React, { useContext } from 'react';
import { customInputTheme } from '../../utils/custom-input-theme';
import BasketInfo from '../../components/Cart/BasketInfo/BasketInfo';
import { AuthContext } from '../../context';
import EmptyCartMessage from './EmptyCart/EmptyCart';
import BasketItems from '../../components/Cart/BasketItems/BasketItems';

export default function Basket() {
  const outerTheme = useTheme();
  const { isAuth } = useContext(AuthContext);
  const cartData = localStorage.getItem('cartData');
  const anonCartData = localStorage.getItem('anonCartData');

  const data = cartData ? JSON.parse(cartData) : null;
  const dataAnonim = anonCartData ? JSON.parse(anonCartData) : null;

  return (
    <ThemeProvider theme={customInputTheme(outerTheme)}>
      <Grid
        container
        justifyContent="center"
        component="main"
        sx={{ mt: '30px' }}
      >
        <Grid
          item
          xs={12}
          sm={12}
          md={7}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Grid item xs={12} sm={12} sx={{ m: '5px' }}>
            {isAuth && cartData ? (
              data.lineItems.length > 0 ? (
                <BasketItems data={data} />
              ) : (
                <EmptyCartMessage />
              )
            ) : anonCartData && dataAnonim.lineItems.length > 0 ? (
              <BasketItems data={dataAnonim} />
            ) : (
              <EmptyCartMessage />
            )}
          </Grid>
        </Grid>
        {(anonCartData && dataAnonim.lineItems.length > 0) ||
        (cartData && data.lineItems.length > 0) ? (
          <Grid
            item
            xs={12}
            sm={12}
            md={4}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'start',
              '@media (max-width: 900px)': {
                alignItems: 'center',
                padding: '30px',
              },
            }}
          >
            {isAuth ? (
              <BasketInfo data={data} />
            ) : (
              <BasketInfo data={dataAnonim} />
            )}
          </Grid>
        ) : (
          <></>
        )}
      </Grid>
    </ThemeProvider>
  );
}
