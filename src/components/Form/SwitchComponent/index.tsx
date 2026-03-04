import { styled } from '@mui/material/styles';
import Switch, { type SwitchProps } from '@mui/material/Switch';
import React from 'react';

const IOSSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 24,
  padding: 0,
  display: 'flex',
  '& .MuiSwitch-switchBase': {
    padding: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(18px)',
      color: theme.palette.common.white,
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.primary.main,
        opacity: 1,
        border: 0,
      },
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color: theme.palette.divider,
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: 0.5,
      backgroundColor: theme.palette.background.default,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 20,
    height: 20,
    backgroundColor: theme.palette.common.white,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.divider,
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 300,
    }),
  },
}));

export const SwitchComponent: React.FC<SwitchProps> = props => {
  return <IOSSwitch {...props} />;
};

export default SwitchComponent;
