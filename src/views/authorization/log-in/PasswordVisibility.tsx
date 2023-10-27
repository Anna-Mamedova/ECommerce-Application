import React from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { IPasswordInputProps } from '../../../interfaces/auth.interface';

const PasswordVisibility: React.FC<IPasswordInputProps> = ({
  showPassword,
  handleClickShowPassword,
}) => {
  return (
    <InputAdornment position="end">
      <IconButton
        aria-label="toggle password visibility"
        onClick={handleClickShowPassword}
        edge="end"
      >
        {showPassword ? <Visibility /> : <VisibilityOff />}
      </IconButton>
    </InputAdornment>
  );
};

export default PasswordVisibility;
