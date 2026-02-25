import type { AutocompleteProps } from '@mui/material';
import type { ReactNode } from 'react';
import type { Control, FieldValues, Path } from 'react-hook-form';
import type { FormOption } from '../Form.interfaces';

export interface AutocompleteComponentProps<T extends FieldValues> extends Omit<
  AutocompleteProps<FormOption, boolean, boolean, boolean>,
  | 'name'
  | 'value'
  | 'onChange'
  | 'onInputChange'
  | 'renderInput'
  | 'options'
  | 'loading'
  | 'multiple'
  | 'freeSolo'
  | 'disabled'
  | 'getOptionLabel'
  | 'isOptionEqualToValue'
  | 'size'
> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  size?: 'small' | 'medium';
  options?: FormOption[];
  loading?: boolean;
  multiple?: boolean;
  freeSolo?: boolean;
  placeholder?: string;
  disabled?: boolean;
  debounceTime?: number;
  onSearch?: (value: string) => void;
  getOptionLabel?: (option: FormOption | string) => string;
  isOptionEqualToValue?: (option: FormOption, value: FormOption) => boolean;
  helperText?: string;
  required?: boolean;
  labelProps?: {
    color?: string;
    fontSize?: string | number;
    fontWeight?: string | number;
    marginBottom?: string | number;
  };
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  withDivider?: boolean;
  returnType?: 'value' | 'label' | 'option';
}
