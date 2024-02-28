"use client"

import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const theme = createTheme({
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  palette: {
    primary: {
        main: "#d63434",
        light: "#676262"

    },
    secondary: {
        main: "#f15755",
        light: "#ffced4",
        dark: "#b62334"
    },
    error: {
      main: "#686366"
    }
  }
});

export default theme;