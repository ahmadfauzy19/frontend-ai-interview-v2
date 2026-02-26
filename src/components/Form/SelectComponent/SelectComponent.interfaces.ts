import type { FormOption } from '@/components/Form/Form.interfaces';
import type { ReactNode } from 'react';
import type { Control, FieldValues, Path } from 'react-hook-form';

export interface SelectComponentProps<
  T extends FieldValues,
  V = string | number,
> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  size?: 'small' | 'medium';
  multiple?: boolean;
  loading?: boolean;
  placeholder?: string;
  disabled?: boolean;
  options?: (string | FormOption<V>)[];
  getOptionLabel?: (option: FormOption<V> | string) => ReactNode;
  required?: boolean;
  labelProps?: {
    color?: string;
    fontSize?: string | number;
    fontWeight?: string | number;
    marginBottom?: string | number;
  };
  helperText?: string;
  fullWidth?: boolean;
}
