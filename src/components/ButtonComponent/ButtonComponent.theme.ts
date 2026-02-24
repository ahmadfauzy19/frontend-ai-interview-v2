import { createTheme } from '@mui/material';

export const ButtonComponentTheme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          variants: [
            {
              props: {},
              style: {
                textTransform: 'capitalize',
                boxShadow: 'none',
                borderRadius: '6px',
                '&:hover': { boxShadow: 'none' },
              },
            },
            {
              props: { size: 'small' },
              style: {
                padding: '8px 12px',
                borderRadius: '6px',
                gap: '4px',
              },
            },
            {
              props: { size: 'medium' },
              style: {
                padding: '10px 14px',
                borderRadius: '6px',
                gap: '6px',
              },
            },
            {
              props: { size: 'large' },
              style: {
                padding: '12px 16px',
                borderRadius: '6px',
                gap: '8px',
              },
            },
          ],
        },
      },
    },
  },
});
