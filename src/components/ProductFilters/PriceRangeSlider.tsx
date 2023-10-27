import { Box, InputLabel, Slider } from '@mui/material';
import React from 'react';
import { IPriceRangeSliderProps } from '../../interfaces/product.interface';

function PriceRangeSlider({
  minPriceValue,
  maxPriceValue,
  priceRangeSliderValues,
  setPriceRangeSliderValues,
}: IPriceRangeSliderProps) {
  const handlePriceRangeSlider = (
    event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    if (!Array.isArray(newValue)) return;
    const minDistance = 20;

    if (activeThumb === 0) {
      const min = Math.min(
        newValue[0],
        priceRangeSliderValues[1] - minDistance
      );
      const max = priceRangeSliderValues[1];
      setPriceRangeSliderValues([min, max]);
    } else {
      const min = priceRangeSliderValues[0];
      const max = Math.max(
        newValue[1],
        priceRangeSliderValues[0] + minDistance
      );
      setPriceRangeSliderValues([min, max]);
    }
  };

  return (
    <Box sx={{ maxWidth: '300px' }}>
      <InputLabel sx={{ mb: 4 }}>Price range: </InputLabel>
      <Slider
        min={minPriceValue}
        max={maxPriceValue}
        getAriaLabel={() => 'Minimum distance'}
        value={priceRangeSliderValues}
        onChange={handlePriceRangeSlider}
        valueLabelDisplay="on"
        getAriaValueText={(value: number) => `${value}`}
        disableSwap
        sx={{ color: 'black' }}
      />
    </Box>
  );
}

export default PriceRangeSlider;
