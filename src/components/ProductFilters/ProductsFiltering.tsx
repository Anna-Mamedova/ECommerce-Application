import {
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
} from '@mui/material';
import React from 'react';
import { IProductsFiltersMenuProps } from '../../interfaces/product.interface';

function ProductsFiltering({
  sortFilter,
  setSortFilter,
  filterColorValue,
  setFilterColorValue,
  colorsAttributesArray,
}: Pick<
  IProductsFiltersMenuProps,
  | 'sortFilter'
  | 'setSortFilter'
  | 'filterColorValue'
  | 'setFilterColorValue'
  | 'colorsAttributesArray'
>) {
  return (
    <>
      <FormControl
        variant="standard"
        sx={{ m: 0, minWidth: 120, maxHeight: 40 }}
      >
        <InputLabel id="demo-simple-select-label">Sort by</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={sortFilter}
          label="Sort by"
          onChange={(event) => setSortFilter(event.target.value)}
        >
          <MenuItem value={'default'}>Default</MenuItem>
          <MenuItem value={'sort=price asc'}>Price low</MenuItem>
          <MenuItem value={'sort=price desc'}>Price high</MenuItem>
          <MenuItem value={'sort=name.en-us asc'}>Name A-Z</MenuItem>
          <MenuItem value={'sort=name.en-us desc'}>Name Z-A</MenuItem>
        </Select>
      </FormControl>
      <FormControl>
        {colorsAttributesArray.length > 0 && (
          <>
            <FormLabel id="demo-controlled-radio-buttons-group">
              Color
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={filterColorValue}
              onChange={(event) => setFilterColorValue(event.target.value)}
            >
              {colorsAttributesArray.map((item) => (
                <FormControlLabel
                  key={item.term}
                  value={item.term}
                  control={<Radio />}
                  label={item.term}
                />
              ))}
            </RadioGroup>
          </>
        )}
      </FormControl>
    </>
  );
}

export default ProductsFiltering;
