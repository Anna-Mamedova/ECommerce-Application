import { createTheme, Theme } from '@mui/material';

export const customInputTheme = (outerTheme: Theme) =>
  createTheme({
    palette: {
      mode: outerTheme.palette.mode,
    },
    components: {
      MuiInput: {
        styleOverrides: {
          underline: {
            '&:after': {
              borderBottomColor: 'black',
            },
          },
        },
      },

      MuiTextField: {
        styleOverrides: {
          root: {
            '--TextField-brandBorderColor': '#E0E3E7',
            '--TextField-brandBorderHoverColor': '#B2BAC2',
            '--TextField-brandBorderFocusedColor': 'black',
            '& label.Mui-focused': {
              color: 'var(--TextField-brandBorderFocusedColor)',
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          notchedOutline: {
            borderColor: 'var(--TextField-brandBorderColor)',
          },
          root: {
            [`&:hover .MuiOutlinedInput-notchedOutline`]: {
              borderColor: 'var(--TextField-brandBorderHoverColor)',
            },
            [`&.Mui-focused .MuiOutlinedInput-notchedOutline`]: {
              borderColor: 'var(--TextField-brandBorderFocusedColor)',
            },
          },
        },
      },
    },
  });
