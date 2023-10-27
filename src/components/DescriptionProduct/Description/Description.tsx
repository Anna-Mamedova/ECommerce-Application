import { Paper, Typography } from '@mui/material';
import React from 'react';
import { IProductData } from '../../../interfaces/product.interface';
import styles from '../DescriptionProduct.module.css';

export default function Description({ productData }: IProductData) {
  return (
    <>
      <Typography sx={{ mr: 1, mt: '10px' }}>Description:</Typography>
      <Paper className={styles.scroll} sx={{ boxShadow: 'none' }}>
        <Typography variant="body2" color="text.secondary">
          {productData &&
            productData?.masterData?.current?.description['en-US']}
        </Typography>
      </Paper>
    </>
  );
}
