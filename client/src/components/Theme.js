// Provides theme colors to the app
// How to use it:
//    1) Go to: https://material.io/resources/color/#!/?view.left=0&view.right=0
//    2) Choose a primary and a secondary color from the material palette or from the Custom Tab
//    3) Copy the Hex values of the primary and secondary colors and paste them below
//    4) Refresh the browser everytime you change the color.
//
// Note: To see how components look with the new color, visit this website:
//    1) visit: https://bareynol.github.io/mui-theme-creator/
//    2) Enter the primary and secondary color hex values on the right
//    3) Click any component on the list on the left to see them with the color entered.

import { createTheme } from '@mui/material/styles';

export const Theme = createTheme({
  palette: {
    primary: {
      // main: '#0031FF',
      // main: '#3f51b5',
      main: '#232323',
      light: '#4F4F4F',
      dark: '#181818',
      contrastText: '#ffb609'
    },
    secondary: {
      // main: '#FFCE00',
      // main: '#f44336',
      main: '#ffb609',
      light: '#FFC43A',
      dark: '#B27F06',
      contrastText: '#181818'
    },
    third: {
      // main: '#FFCE00',
      // main: '#f44336',
      notmain: '#FF0000',
      light: '#FFC43A',
      dark: '#B27F06',
      contrastText: '#181818'
    },
  },
  // typography: {
  //   fontFamily: [
  //     "Comic Sans MS",
  //     "Comic Sans",
  //     "cursive",
  //   ].join(','),
  // }
});