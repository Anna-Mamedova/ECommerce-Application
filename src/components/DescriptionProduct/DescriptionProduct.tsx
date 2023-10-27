import React from 'react';
import { Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { formatCentsToCurrency } from '../../utils/product';
import ProductPrice from '../Price/Price';
import { IProductPriceProps } from '../../interfaces/product.interface';
import AddToCart from './AddToCart/AddToCart';
import Size from './Size/Size';
import Description from './Description/Description';
import Banner from './Banner/Banner';
import styles from './DescriptionProduct.module.css';

export default function DescriptionProduct({
  itemDiscount,
  currencySymbol,
  itemPriceInCents,
  productData,
  currencyCode,
}: IProductPriceProps) {
  return (
    <>
      <Box
        sx={{
          my: 8,
          mx: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'left',
        }}
      >
        <Typography
          color="text.secondary"
          fontSize="0.8rem"
          marginBottom="10px"
        >
          <Link to="/catalog" className={styles.link}>
            catalog
          </Link>
          {`/${productData?.key}`}
        </Typography>
        {itemDiscount ? (
          <Banner color="#da0000" label="DEAL" />
        ) : (
          <Banner color="black" label="NEW" />
        )}
        <Typography variant="h5" component="h1">
          {productData && productData.masterData?.current?.name['en-US']}
        </Typography>
        <Typography color="text.secondary" sx={{ mr: 1, mt: '10px' }}>
          PRICE:
        </Typography>
        {itemDiscount && currencyCode && itemPriceInCents ? (
          <ProductPrice
            itemDiscount={itemDiscount}
            currencyCode={currencyCode}
            itemPriceInCents={itemPriceInCents}
          />
        ) : (
          <Typography sx={{ fontWeight: 'bold' }}>
            {productData &&
              itemPriceInCents &&
              formatCentsToCurrency(itemPriceInCents)}
            {currencySymbol}
          </Typography>
        )}
        <Size />
        <AddToCart name="Add To Cart" />
        <Description productData={productData} />
      </Box>
    </>
  );
}
