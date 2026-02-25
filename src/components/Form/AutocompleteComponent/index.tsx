import { Icon } from '@iconify/react';
import {
  Autocomplete,
  Box,
  Chip,
  CircularProgress,
  createFilterOptions,
  Divider,
  TextField,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';
import { useEffect, useState } from 'react';
import type { FieldValues } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { useDebounce } from 'use-debounce';
import type { FormOption } from '../Form.interfaces';
import type { AutocompleteComponentProps } from './AutocompleteComponent.interfaces';

const filter = createFilterOptions<FormOption>();

const findOptionByValue = (
  options: FormOption[],
  val: string,
  returnType: string
): FormOption | undefined => {
  if (returnType === 'label') {
    return options.find(opt => opt.label === val);
  }
  if (returnType === 'value') {
    return options.find(opt => opt.value === val);
  }
  return options.find(opt => opt.value === val || opt.label === val);
};

const resolveValueToOption = (
  val: string | FormOption,
  options: FormOption[]
): FormOption | null => {
  if (!val || val === null || val === undefined) {
    return null;
  }

  if (val && typeof val === 'object' && 'label' in val && 'value' in val) {
    return val;
  }

  if (typeof val === 'string') {
    return (
      options.find(opt => opt.value === val || opt.label === val) ?? {
        label: String(val),
        value: val,
      }
    );
  }

  if (val && typeof val === 'object') {
    const normalize = (obj: any) =>
      JSON.stringify(
        obj,
        Object.keys(obj).sort((a, b) =>
          a.localeCompare(b, undefined, { sensitivity: 'base' })
        )
      );

    const found = options.find(opt => {
      if (typeof opt.value === 'object' && opt.value !== null) {
        return normalize(opt.value) === normalize(val);
      }
      return false;
    });

    if (found) return found;
  }

  return null;
};

const mapArrayValues = (
  valueArray: (string | FormOption)[],
  options: FormOption[],
  returnType: string
): FormOption[] => {
  return valueArray.map(val => {
    if (typeof val !== 'string') return val;

    const foundOption = findOptionByValue(options, val, returnType);
    return foundOption ?? { label: String(val), value: val };
  });
};

const handleFilterOptions = (
  opts: FormOption[],
  params: any,
  freeSolo: boolean
) => {
  const filtered = filter(opts, params);

  if (freeSolo && params.inputValue) {
    const isExisting = opts.some(
      opt => opt.label === params.inputValue || opt.value === params.inputValue
    );
    if (!isExisting) {
      filtered.push({
        label: params.inputValue,
        value: params.inputValue,
      });
    }
  }
  return filtered;
};

export const AutocompleteComponent = <T extends FieldValues>({
  name,
  control,
  label,
  size = 'small',
  options = [],
  loading = false,
  multiple = false,
  freeSolo = false,
  placeholder,
  disabled = false,
  debounceTime = 300,
  onSearch,
  getOptionLabel = (option: FormOption | string) =>
    typeof option === 'string' ? option : (option.label ?? ''),
  isOptionEqualToValue = (option, value) => option?.value === value?.value,
  helperText,
  required = false,
  labelProps,
  startIcon,
  endIcon,
  withDivider,
  returnType = 'value',
  ...restProps
}: AutocompleteComponentProps<T>) => {
  const theme = useTheme();

  const [inputValue, setInputValue] = useState('');
  const [debouncedInputValue] = useDebounce(inputValue, debounceTime);

  useEffect(() => {
    if (onSearch && debouncedInputValue !== undefined) {
      onSearch(debouncedInputValue);
    }
  }, [debouncedInputValue, onSearch]);

  const defaultLabelProps = {
    color: theme.palette.text.secondary,
    fontSize: 14,
    fontWeight: 500,
    marginBottom: 1,
    ...labelProps,
  };

  const mapValue = (val: FormOption): string | FormOption => {
    if (returnType === 'label') return val.label;
    if (returnType === 'value') return val.value as string;
    return val;
  };

  const getDisplayValue = (
    fieldValue: string | string[] | FormOption | FormOption[] | undefined,
    multiple?: boolean
  ): FormOption | FormOption[] | null => {
    if (!fieldValue) return multiple ? [] : null;

    if (multiple && !Array.isArray(fieldValue)) {
      return [];
    }

    if (!multiple && Array.isArray(fieldValue)) {
      return null;
    }

    if (multiple) {
      const valueArray = fieldValue as (string | FormOption)[];
      return mapArrayValues(valueArray, options, returnType);
    }

    return resolveValueToOption(fieldValue as string | FormOption, options);
  };

  const handleAutocompleteChange = (value: any) => {
    if (!value) return multiple ? [] : undefined;

    if (multiple) {
      return (value as FormOption[]).map(val => mapValue(val));
    }
    return mapValue(value as FormOption);
  };

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: required ? `${label || 'Field'} is required` : false,
      }}
      render={({ field, fieldState }) => {
        let hasValue = false;
        if (field.value) {
          hasValue = multiple ? (field.value as any[]).length > 0 : true;
        }

        const placeholderValue = hasValue ? undefined : placeholder;

        return (
          <Box>
            {label && (
              <Tooltip title={label} placement="top-start">
                <Typography
                  component="label"
                  variant="body2"
                  sx={{
                    display: 'block',
                    ...defaultLabelProps,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {label}
                  {required && (
                    <Typography
                      component="span"
                      sx={{
                        color: 'error.main',
                        fontSize: defaultLabelProps.fontSize,
                        fontWeight: defaultLabelProps.fontWeight,
                        marginLeft: 0.5,
                        fontStyle: 'italic',
                      }}
                    >
                      *
                    </Typography>
                  )}
                </Typography>
              </Tooltip>
            )}

            <Autocomplete
              {...field}
              multiple={multiple}
              disableCloseOnSelect={false}
              value={getDisplayValue(field.value, multiple)}
              inputValue={inputValue}
              size={size}
              options={options}
              loading={loading}
              freeSolo={freeSolo}
              getOptionLabel={getOptionLabel}
              filterOptions={(opts, params) =>
                handleFilterOptions(opts, params, freeSolo)
              }
              isOptionEqualToValue={isOptionEqualToValue}
              onChange={(_, value) => {
                const mappedValue = handleAutocompleteChange(value);
                field.onChange(mappedValue);
              }}
              onInputChange={(_, value, reason) => {
                if (multiple) {
                  if (reason === 'input') {
                    setInputValue(value);
                  }
                } else {
                  setInputValue(value);
                }
              }}
              disabled={disabled}
              {...restProps}
              slotProps={{
                paper: {
                  sx: {
                    marginTop: 0.5,
                    borderRadius: 2,
                    border: `1px solid ${theme.palette.divider}`,
                  },
                },
              }}
              popupIcon={
                endIcon || (
                  <Icon
                    icon="solar:alt-arrow-down-linear"
                    fontSize={20}
                    color={theme.palette.text.secondary}
                  />
                )
              }
              {...(multiple && {
                renderTags: (value: unknown, getTagProps) => {
                  const items = Array.isArray(value) ? value : [value];
                  return (
                    <>
                      {items
                        .filter(Boolean)
                        .map((option: any, index: number) => {
                          const { key, ...tagProps } = getTagProps({ index });
                          return (
                            <Chip
                              key={key}
                              label={getOptionLabel(option)}
                              size={size}
                              {...tagProps}
                              sx={{
                                opacity: 1,
                                '&.MuiChip-filled': {
                                  opacity: 1,
                                },
                              }}
                            />
                          );
                        })}
                    </>
                  );
                },
              })}
              renderInput={params => (
                <TextField
                  {...params}
                  placeholder={placeholderValue}
                  error={!!fieldState.error}
                  slotProps={{
                    input: {
                      ...params.InputProps,
                      startAdornment: (
                        <>
                          {startIcon}
                          {params.InputProps.startAdornment}{' '}
                        </>
                      ),
                      endAdornment: (
                        <>
                          {withDivider && (
                            <Divider
                              orientation="vertical"
                              variant="middle"
                              flexItem
                            />
                          )}
                          {loading && <CircularProgress size={20} />}
                          {params.InputProps.endAdornment}
                        </>
                      ),
                    },
                  }}
                  sx={{
                    backgroundColor: theme.palette.background.paper,
                    width: '100%',
                  }}
                />
              )}
            />

            {(helperText || fieldState.error?.message) && (
              <Box sx={{ mt: 0.5 }}>
                <Typography
                  variant="caption"
                  color={fieldState.error ? 'error' : 'textSecondary'}
                >
                  {fieldState.error?.message || helperText}
                </Typography>
              </Box>
            )}
          </Box>
        );
      }}
    />
  );
};

export default AutocompleteComponent;
