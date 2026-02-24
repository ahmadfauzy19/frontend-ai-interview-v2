import { createTheme } from '@mui/material';
import { ButtonComponentTheme } from '../../components/ButtonComponent/ButtonComponent.theme';
import { commonThemeOptions } from './baseTheme';

const baseTheme = createTheme();

export const mainTheme = createTheme(baseTheme, ButtonComponentTheme, {
  ...commonThemeOptions,
  palette: {
    primary: {
      main: '#0076D2',
    },
    secondary: {
      main: '#ffcc00',
    },
    error: {
      main: '#d32f2f',
    },
    text: {
      primary: '#000000',
      secondary: '#707784',
    },
  },
});
