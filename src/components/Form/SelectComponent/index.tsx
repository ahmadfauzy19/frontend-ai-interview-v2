import type { FormOption } from '@/components/Form/Form.interfaces';
import type { SelectComponentProps } from '@/components/Form/SelectComponent/SelectComponent.interfaces';
import { Icon } from '@iconify/react';
import {
  Box,
  CircularProgress,
  MenuItem,
  Select,
  type SelectChangeEvent,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';
import { useState } from 'react';
import { Controller, type FieldValues } from 'react-hook-form';

interface ExtraProps {
  returnType?: 'value' | 'label';
}

export const SelectComponent = <T extends FieldValues>({
  name,
  control,
  label,
  size = 'small',
  options = [],
  multiple = false,
  loading = false,
  placeholder,
  disabled = false,
  getOptionLabel = (option: string | FormOption) =>
    typeof option === 'string' ? option : (option?.label ?? ''),
  required = false,
  labelProps,
  helperText,
  returnType = 'value',
  fullWidth = false,
  startIcon,
}: SelectComponentProps<T> & ExtraProps) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const defaultLabelProps = {
    color: theme.palette.text.secondary,
    fontSize: 14,
    fontWeight: 500,
    marginBottom: 1,
    ...labelProps,
  };

  const renderLabel = () =>
    label && (
      <Tooltip title={label} placement="top-start">
        <Typography
          component="label"
          variant="body2"
          sx={{
            display: 'block',
            color: defaultLabelProps.color,
            fontSize: defaultLabelProps.fontSize,
            fontWeight: defaultLabelProps.fontWeight,
            marginBottom: defaultLabelProps.marginBottom,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            textAlign: 'left',
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
    );

  const renderIcon = () => (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 32,
        height: 32,
        marginRight: 0.5,
        cursor: 'pointer',
      }}
    >
      {loading ? (
        <CircularProgress size={20} />
      ) : (
        <Icon
          icon="solar:alt-arrow-down-linear"
          fontSize={20}
          color={theme.palette.text.secondary}
          onClick={() => setOpen(!open)}
        />
      )}
    </Box>
  );

  const renderStartIcon = () => (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 32,
        height: 32,
        marginRight: 0.5,
        cursor: 'pointer',
      }}
    >
      {startIcon}
    </Box>
  );

  const findOption = (val: string) =>
    options.find(o =>
      typeof o === 'string' ? o === val : String(o.value) === val
    );

  const mapSingleValue = (val: string) => {
    const opt = findOption(val);
    if (returnType === 'label') {
      return getOptionLabel(opt ?? val);
    } else {
      const optionValue = typeof opt === 'string' ? opt : String(opt?.value);
      return optionValue ?? val;
    }
  };

  const mapValue = (val: string | string[]) => {
    if (multiple && Array.isArray(val)) {
      return val.map(mapSingleValue);
    }
    return mapSingleValue(val as string);
  };

  const getLabel = (val: string) => {
    const opt = findOption(val);
    return opt ? getOptionLabel(opt) : val;
  };

  const renderValue = (selected: string | string[]) => {
    if (!selected || (Array.isArray(selected) && selected.length === 0)) {
      return placeholder || 'Choose...';
    }
    return Array.isArray(selected)
      ? selected.map(getLabel).join(', ')
      : getLabel(selected);
  };

  const renderSelect = (
    selectValue: string | string[] | undefined,
    onChangeHandler: (val: string | string[]) => void,
    errorMessage?: string
  ) => {
    const isPlaceholder =
      !selectValue || (Array.isArray(selectValue) && selectValue.length === 0);

    return (
      <Box>
        {renderLabel()}
        <Select
          open={open}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          value={selectValue ?? (multiple ? [] : '')}
          size={size}
          multiple={multiple}
          displayEmpty
          disabled={disabled}
          readOnly={loading}
          fullWidth={fullWidth}
          error={!!errorMessage}
          startAdornment={renderStartIcon()}
          sx={{
            '& .MuiSelect-select': {
              paddingRight: '0px !important',
              textAlign: 'left',
              color: isPlaceholder ? theme.palette.text.secondary : 'inherit',
            },
          }}
          onChange={(e: SelectChangeEvent<string | string[]>) => {
            const rawVal = e.target.value;
            mapValue(rawVal);
            onChangeHandler(rawVal);
          }}
          renderValue={renderValue}
          MenuProps={{
            PaperProps: {
              sx: {
                marginTop: 0.5,
                borderRadius: 2,
                border: `1px solid ${theme.palette.divider}`,
              },
            },
          }}
          IconComponent={renderIcon}
        >
          {options.map(option => {
            const optionValue =
              typeof option === 'string' ? option : String(option.value);
            return (
              <MenuItem key={optionValue} value={optionValue}>
                {getOptionLabel(option)}
              </MenuItem>
            );
          })}
        </Select>

        {(helperText || errorMessage) && (
          <Typography
            variant="caption"
            color={errorMessage ? 'error' : 'textSecondary'}
            sx={{ mt: 0.5, display: 'block', textAlign: 'left' }}
          >
            {errorMessage || helperText}
          </Typography>
        )}
      </Box>
    );
  };

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: required ? `${label || 'Field'} is required` : false,
      }}
      render={({ field, fieldState }) =>
        renderSelect(field.value, field.onChange, fieldState.error?.message)
      }
    />
  );
};

export default SelectComponent;
