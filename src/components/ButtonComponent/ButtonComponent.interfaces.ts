import type { ButtonProps, IconButtonProps } from '@mui/material';
import type {
  ButtonComponentColor,
  ButtonComponentSize,
  ButtonComponentVariant,
} from './ButtonComponent.types';

export interface ButtonComponentProps extends Omit<
  ButtonProps & IconButtonProps,
  'variant' | 'size' | 'color'
> {
  variant?: ButtonComponentVariant;
  size?: ButtonComponentSize;
  color?: ButtonComponentColor;
}
