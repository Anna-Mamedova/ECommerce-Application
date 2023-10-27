import { ArrowUpward, Tune } from '@mui/icons-material';
import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import ProductsFiltering from './ProductsFiltering';
import PriceRangeSlider from './PriceRangeSlider';
import { IProductsFiltersMenuProps } from '../../interfaces/product.interface';

function ProductsFiltersMenu(props: IProductsFiltersMenuProps) {
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          mb: 3,
          flexWrap: 'wrap',
          columnGap: '20px',
          ml: 2,
          alignItems: 'flex-end',
        }}
      >
        <Box>
          <Tune onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)} />
          <Typography display="block" variant="caption" color="text.secondary">
            To filter and organize
          </Typography>
        </Box>
        <TextField
          id="standard-basic"
          label="Search"
          variant="standard"
          margin="normal"
          value={props.textSeachFilter}
          onChange={(event) => props.setTextSeachFilter(event.target.value)}
          sx={{ m: 0 }}
        />
      </Box>
      <Box
        sx={{
          display: isFilterMenuOpen ? 'block' : 'none',
          backgroundColor: '#FFFCF7',
          p: 2,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            columnGap: '40px',
            rowGap: '20px',
            alignItems: 'flex-start',
            mb: 2,
            flexWrap: 'wrap',
          }}
        >
          <Box onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}>
            <ArrowUpward
              sx={{ color: 'text.secondary', width: '20px', height: '20px' }}
            />
            <Typography
              display="block"
              variant="caption"
              color="text.secondary"
            >
              Collapse
            </Typography>
          </Box>
          <ProductsFiltering
            sortFilter={props.sortFilter}
            setSortFilter={props.setSortFilter}
            filterColorValue={props.filterColorValue}
            setFilterColorValue={props.setFilterColorValue}
            colorsAttributesArray={props.colorsAttributesArray}
          />
        </Box>
        <Box>
          {props.minPriceValue && props.maxPriceValue ? (
            <PriceRangeSlider
              minPriceValue={props.minPriceValue}
              maxPriceValue={props.maxPriceValue}
              priceRangeSliderValues={props.priceRangeSliderValues}
              setPriceRangeSliderValues={props.setPriceRangeSliderValues}
            />
          ) : null}
          <Button
            onClick={props.applyFilters}
            variant="outlined"
            sx={{ color: 'black', borderColor: 'black', mr: 3, mb: 1 }}
          >
            Apply filters
          </Button>
          <Button
            onClick={props.handleResetFilters}
            variant="outlined"
            sx={{ color: 'black', borderColor: 'black', mb: 1 }}
          >
            Reset filters
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default ProductsFiltersMenu;
