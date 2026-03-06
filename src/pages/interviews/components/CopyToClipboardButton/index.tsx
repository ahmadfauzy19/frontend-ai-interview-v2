import { ButtonComponent } from '@/components/ButtonComponent';
import { useSnackbar } from '@/context/snackbar/SnackbarContext';
import { Icon } from '@iconify/react';
import { Tooltip, useTheme } from '@mui/material';

const CopyToClipboardButton = ({ textToCopy }: { textToCopy: string }) => {
  const { showSnackbar } = useSnackbar();
  const theme = useTheme();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      showSnackbar('Copied to clipboard', 'success');
    } catch (err) {
      console.error('Failed to copy text: ', err);
      showSnackbar('Failed to copy text', 'error');
    }
  };

  return (
    <Tooltip title="Copy Interview Link" placement="top">
      <ButtonComponent
        onClick={handleCopy}
        sx={{
          backgroundColor: 'white',
          '&:hover': { backgroundColor: 'white', opacity: 0.8 },
        }}
        variant="icon"
        size="small"
      >
        <Icon
          icon="material-symbols:content-copy-rounded"
          width={15}
          color={theme.palette.primary.main}
        />
      </ButtonComponent>
    </Tooltip>
  );
};

export default CopyToClipboardButton;
