import { Icon } from '@iconify/react';
import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';
import DOMPurify from 'dompurify';
import { useState } from 'react';
import { Controller, type FieldValues } from 'react-hook-form';
import type {
  ControlledTextFieldProps,
  TextfieldComponentProps,
} from './TextfieldComponent.interfaces';

const sanitizeInput = (value: string): string => {
  const sanitized = DOMPurify.sanitize(value, {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [],
    KEEP_CONTENT: true,
    RETURN_TRUSTED_TYPE: false,
  });

  return sanitized;
};

const renderLabel = (
  label: string | undefined,
  required: boolean,
  defaultLabelProps: any,
  format?: string,
  onFormatToJson?: () => void
) => {
  if (!label) return null;
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: defaultLabelProps.marginBottom,
      }}
    >
      <Tooltip
        title={label}
        placement="top-start"
        slotProps={{
          popper: {
            modifiers: [
              {
                name: 'offset',
                options: {
                  offset: [0, -14],
                },
              },
            ],
          },
        }}
      >
        <Typography
          component="label"
          variant="body2"
          sx={{
            display: 'block',
            color: defaultLabelProps.color,
            fontSize: defaultLabelProps.fontSize,
            fontWeight: defaultLabelProps.fontWeight,
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
      {format === 'json' && onFormatToJson && (
        <Tooltip title="Format ke JSON">
          <IconButton
            size="small"
            onClick={onFormatToJson}
            sx={{ padding: 0.5 }}
          >
            <Icon icon="solar:code-square-linear" width={18} />
          </IconButton>
        </Tooltip>
      )}
    </Box>
  );
};

const renderHelperText = (
  fieldState: any,
  helperText: string | undefined,
  internalValue: string,
  maxLength?: number,
  isMaxLengthHelper?: boolean,
  format?: string
) => {
  let displayedHelper = helperText;

  if (!(displayedHelper || fieldState.error?.message || maxLength)) return null;

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        mt: 0.5,
      }}
    >
      <Typography
        variant="caption"
        color={fieldState.error ? 'error' : 'textSecondary'}
      >
        {format === 'terbilang' && 'Terbilang: '}
        {fieldState.error?.message || displayedHelper}
      </Typography>
      {maxLength !== undefined && isMaxLengthHelper && (
        <Typography
          variant="caption"
          color={internalValue.length > maxLength ? 'error' : 'textSecondary'}
        >
          {internalValue.length}/{maxLength}
        </Typography>
      )}
    </Box>
  );
};

const ControlledTextField = <T extends FieldValues>({
  field,
  fieldState,
  name,
  control,
  label,
  format = 'text',
  startIcon,
  endIcon,
  helperText,
  required = false,
  labelProps,
  multiline = false,
  maxLength,
  isMaxLengthHelper = false,
  sx,
  type = 'text',
  validationRegex,
  validationRegexMessage,
  size = 'small',
  returnFormat,
  ...props
}: TextfieldComponentProps<T> & ControlledTextFieldProps<T>) => {
  const [showPassword, setShowPassword] = useState(false);
  const internalValue = field.value ? String(field.value) : '';

  const getConvertedValue = (value: string) => {
    if (returnFormat === 'number') {
      if (value === '') return undefined;
      return Number(value);
    }
    return value;
  };

  const handleChange = (raw: string) => {
    const sanitized = sanitizeInput(raw);

    const applyMaxLength = (val: string) =>
      !maxLength || val.length <= maxLength;

    const hasInvalidLeadingZero = (value: string) =>
      value.length > 1 && value.startsWith('0') && value[1] !== '.';

    const handleNumber = (value: string) => {
      if (value.includes('-')) return;

      if (hasInvalidLeadingZero(value)) return;

      const floatRegex = /^(?:\d+)?(?:\.\d*)?$/;
      if (!floatRegex.test(value)) return;

      if (applyMaxLength(value)) field.onChange(getConvertedValue(value));
    };

    if (format === 'number') return handleNumber(sanitized);

    if (!applyMaxLength(sanitized)) return;
    field.onChange(getConvertedValue(sanitized));
  };

  const getEndAdornment = () => {
    if (type === 'password') {
      return (
        <InputAdornment position="end">
          <IconButton
            onClick={() => setShowPassword(!showPassword)}
            edge="end"
            size="small"
          >
            <Icon
              icon={
                showPassword ? 'solar:eye-closed-linear' : 'solar:eye-linear'
              }
              width={20}
            />
          </IconButton>
        </InputAdornment>
      );
    }

    if (endIcon) {
      return <InputAdornment position="end">{endIcon}</InputAdornment>;
    }

    return undefined;
  };

  const adornments = {
    startAdornment: startIcon ? (
      <InputAdornment position="start">{startIcon}</InputAdornment>
    ) : undefined,
    endAdornment: getEndAdornment(),
  };

  return (
    <Box>
      <TextField
        {...props}
        sx={sx}
        size={size}
        value={internalValue}
        onChange={e => handleChange(e.target.value)}
        onBlur={field.onBlur}
        error={!!fieldState.error}
        type={type === 'password' && showPassword ? 'text' : type}
        variant={props.variant || 'outlined'}
        fullWidth={props.fullWidth !== false}
        multiline={multiline}
        placeholder={props.placeholder || 'Silahkan isi disini'}
        slotProps={{
          input: {
            ...props.slotProps?.input,
            ...adornments,
            inputProps: {
              maxLength: multiline ? 1000 : maxLength,
              inputMode: format === 'number' ? 'numeric' : undefined,
            },
          },
        }}
      />
      {renderHelperText(
        fieldState,
        helperText,
        internalValue,
        maxLength,
        isMaxLengthHelper,
        format
      )}
    </Box>
  );
};

export const TextfieldComponent = <T extends FieldValues>({
  name,
  control,
  label,
  format = 'text',
  startIcon,
  endIcon,
  helperText,
  required = false,
  labelProps,
  multiline = false,
  maxLength,
  sx,
  type = 'text',
  validationRegex,
  validationRegexMessage,
  size = 'small',
  returnFormat,
  ...props
}: TextfieldComponentProps<T>) => {
  const theme = useTheme();
  const defaultLabelProps = {
    color: theme.palette.text.secondary,
    fontSize: 14,
    fontWeight: 500,
    marginBottom: 1,
    ...labelProps,
  };

  const validationRules: any = {
    required: required ? `${label || 'Field'} is required` : false,
    validate: validationRegex
      ? {
          pattern: (value: any) => {
            const strValue = String(value || '');
            if (!strValue) return true;

            let regex: RegExp;
            if (typeof validationRegex === 'string') {
              const pattern = validationRegex.replaceAll(/(?:^\/|\/$)/g, '');
              regex = new RegExp(pattern);
            } else {
              regex = validationRegex;
            }

            return (
              regex.test(strValue) ||
              validationRegexMessage ||
              'Format tidak valid'
            );
          },
        }
      : undefined,
  };

  return (
    <Controller
      name={name}
      control={control}
      rules={validationRules}
      render={({ field, fieldState }) => {
        const handleFormatToJson = () => {
          try {
            const currentValue = String(field.value || '');
            const parsed = JSON.parse(currentValue);
            const formatted = JSON.stringify(parsed, null, 2);
            field.onChange(formatted);
          } catch {
            console.error('Invalid JSON format');
          }
        };

        return (
          <Box>
            {renderLabel(
              label,
              required,
              defaultLabelProps,
              format,
              handleFormatToJson
            )}
            <ControlledTextField
              name={name}
              control={control}
              field={field}
              fieldState={fieldState}
              format={format}
              maxLength={maxLength}
              startIcon={startIcon}
              endIcon={endIcon}
              helperText={helperText}
              label={label}
              required={required}
              multiline={multiline}
              sx={sx}
              type={type}
              validationRegex={validationRegex}
              validationRegexMessage={validationRegexMessage}
              size={size}
              returnFormat={returnFormat}
              {...props}
            />
          </Box>
        );
      }}
    />
  );
};

export default TextfieldComponent;
