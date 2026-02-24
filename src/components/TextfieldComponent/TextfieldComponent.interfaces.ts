import { type TextFieldProps } from '@mui/material';
import React from 'react';
import {
  type Control,
  type ControllerFieldState,
  type ControllerRenderProps,
  type FieldValues,
  type Path,
} from 'react-hook-form';
import type { FormatType } from './TextfieldComponent.types';

export interface TextfieldComponentProps<T extends FieldValues> extends Omit<
  TextFieldProps,
  'name' | 'defaultValue' | 'onChange' | 'label'
> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  format?: FormatType;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  helperText?: string;
  required?: boolean;
  labelProps?: {
    color?: string;
    fontSize?: string | number;
    fontWeight?: string | number;
    marginBottom?: string | number;
  };
  multiline?: boolean;
  maxLength?: number;
  isMaxLengthHelper?: boolean;
  sx?: TextFieldProps['sx'];
  debounceTime?: number;
  type?: React.InputHTMLAttributes<HTMLInputElement>['type'];
  validationRegex?: string | RegExp;
  validationRegexMessage?: string;
  returnFormat?: FormatType;
}

export interface ControlledTextFieldProps<T extends FieldValues> {
  field: ControllerRenderProps<T, Path<T>>;
  fieldState: ControllerFieldState;
}
