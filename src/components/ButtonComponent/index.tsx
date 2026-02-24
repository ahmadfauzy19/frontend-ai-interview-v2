import type { ButtonComponentProps } from './ButtonComponent.interfaces';
import { Button, IconButton } from '@mui/material';
import { getStyles } from './ButtonComponent.styles';

export function ButtonComponent(props: Readonly<ButtonComponentProps>) {
  const { children, variant, sx, ...rest } = props;
  const styles = getStyles();

  if (variant === 'icon') {
    return (
      <IconButton sx={{ ...styles.button, ...sx }} {...rest}>
        {children}
      </IconButton>
    );
  }

  return (
    <Button variant={variant} sx={{ ...styles.button, ...sx }} {...rest}>
      {children}
    </Button>
  );
}
