import React, { useContext, useEffect, useState } from 'react';
import { Grid, CssBaseline, ThemeProvider, useTheme } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { customInputTheme } from '../../utils/custom-input-theme';
import { useApi } from '../../hooks/useApi';
import { AccessTokenContext } from '../../context';
import { IProductsResp } from '../../interfaces/product.interface';
import { Currency } from '../../enums/product.enum';
import { Slider } from '../../components/Slider/Slider';
import ModalWindow from '../../components/Modal/Modal';
import DescriptionProduct from '../../components/DescriptionProduct/DescriptionProduct';
import { statusCodes } from '../../enums/auth.enum';
import { ToastContainer } from 'react-toastify';

function DetailedProductPage() {
  const outerTheme = useTheme();
  const params = useParams();
  const productId = params.id;
  const { token } = useContext(AccessTokenContext);
  const [productData, setProductData] = useState<IProductsResp | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [image, setImage] = useState<string>('');

  function handleClick(img: string) {
    setImage(img);
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  const navigate = useNavigate();

  const [fetchProduct] = useApi(async () => {
    if (productId) {
      const apiUrl = `${process.env.REACT_APP_CTP_API_URL}/${process.env.REACT_APP_CTP_PROJECT_KEY}/products/${productId}`;
      const response = await fetch(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setProductData(data);
      } else if (response.status === statusCodes.NOT_FOUND) {
        navigate('/not-found');
      }
    }
  });

  useEffect(() => {
    if (token) {
      fetchProduct();
    }
  }, [token]);

  const slides =
    productData?.masterData?.staged?.masterVariant?.images?.map((image) => ({
      image: image.url,
    })) || [];

  const itemDiscount =
    productData?.masterData?.staged?.masterVariant?.prices[0]?.discounted;
  const currencyCode =
    productData?.masterData?.staged?.masterVariant?.prices[0]?.value
      ?.currencyCode;
  const currencySymbol = currencyCode === Currency.USD ? '$' : '';
  const itemPriceInCents =
    productData?.masterData?.staged?.masterVariant?.prices[0]?.value
      ?.centAmount;

  return (
    <ThemeProvider theme={customInputTheme(outerTheme)}>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        component="main"
        sx={{ mt: '10px' }}
      >
        <ToastContainer/>
        <CssBaseline />
        <Grid
          item
          xs={12}
          sm={12}
          md={5}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Grid item xs={12} sm={12} sx={{ m: '5px' }}>
            <Slider
              slides={slides}
              handleClick={handleClick}
              handleClose={handleClose}
              image={image}
            />
            {open && (
              <ModalWindow
                slides={slides}
                handleClose={handleClose}
                handleClick={handleClick}
                image={image}
              />
            )}
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <DescriptionProduct
            itemDiscount={itemDiscount}
            currencyCode={currencyCode}
            currencySymbol={currencySymbol}
            itemPriceInCents={itemPriceInCents ? itemPriceInCents : 0}
            productData={productData}
          />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default DetailedProductPage;
