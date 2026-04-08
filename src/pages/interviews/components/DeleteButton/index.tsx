import { ButtonComponent } from '@/components/ButtonComponent';
import { useSnackbar } from '@/context/snackbar/SnackbarContext';
import { Icon } from '@iconify/react';
import { Tooltip, useTheme } from '@mui/material';
import axiosUtils from '@/utils/axiosUtils';

interface Props {
  interviewId: string;
  onSuccess?: () => void; // optional biar fleksibel
}

const DeleteButton = ({ interviewId, onSuccess }: Props) => {
  const { showSnackbar } = useSnackbar();
  const theme = useTheme();

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      'Apakah kamu yakin ingin menghapus interview ini?'
    );

    if (!confirmDelete) return;

    try {
      await axiosUtils.delete(`/interviews/${interviewId}`);

      showSnackbar('Interview deleted successfully', 'success');

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error(error);
      showSnackbar('Failed to delete interview', 'error');
    }
  };

  return (
    <Tooltip title="Delete Interview" placement="top">
      <ButtonComponent
        onClick={handleDelete}
        variant="icon"
        size="small"
        sx={{
          backgroundColor: 'white',
          '&:hover': {
            backgroundColor: 'white',
            opacity: 0.8,
          },
        }}
      >
        <Icon
          icon="mdi:delete-outline"
          width={16}
          color={theme.palette.error.main}
        />
      </ButtonComponent>
    </Tooltip>
  );
};

export default DeleteButton;