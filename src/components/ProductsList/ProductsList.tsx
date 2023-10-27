import { Grid, Typography } from '@mui/material';
import React from 'react';
import ProductCard from '../ProductCard/ProductCard';
import { getProductCartItemData } from '../../views/catalog/productDataConverter';
import { IProductsList } from '../../interfaces/product.interface';

function ProductsList({ productCards }: IProductsList) {
  return (
    <>
      {productCards && productCards.length > 0 ? (
        <Grid container spacing={4} columns={{ xs: 4, sm: 8, md: 12 }} mb={5}>
          {productCards.map((card) => {
            return (
              <Grid item key={card.id} sx={{ maxWidth: 300, margin: '0 auto' }}>
                {<ProductCard item={getProductCartItemData(card)} />}
              </Grid>
            );
          })}
        </Grid>
      ) : (
        <Typography variant="h5" align="center">
          Nothing found. Sorry, but there are currently no products.
        </Typography>
      )}
    </>
  );
}

export default ProductsList;
