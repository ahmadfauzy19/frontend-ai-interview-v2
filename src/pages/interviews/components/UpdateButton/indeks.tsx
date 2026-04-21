import { ButtonComponent } from '@/components/ButtonComponent';
import { Icon } from '@iconify/react';
import { Tooltip, useTheme } from '@mui/material';

interface Props {
  onClick: () => void;
  disabled?: boolean;
}

const EditButton = ({ onClick, disabled }: Props) => {
  const theme = useTheme();

  return (
    <Tooltip
      title={
        disabled
          ? 'Interview sudah memiliki participant'
          : 'Edit Interview'
      }
    >
      <span>
        <ButtonComponent
          onClick={onClick}
          variant="icon"
          size="small"
          disabled={disabled}
          sx={{
            backgroundColor: 'white',
            '&:hover': {
              backgroundColor: 'white',
              opacity: 0.8,
            },

            // 🔥 override disabled style
            '&.Mui-disabled': {
              opacity: 0.6, // jangan terlalu pudar
              backgroundColor: 'white',
            },
          }}
        >
          <Icon
            icon="mdi:pencil-outline"
            width={16}
            color={
              disabled
                ? theme.palette.warning.light
                : theme.palette.warning.main
            }
          />
        </ButtonComponent>
      </span>
    </Tooltip>
  );
};

export default EditButton;