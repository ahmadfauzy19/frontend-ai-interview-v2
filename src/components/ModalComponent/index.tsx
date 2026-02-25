import { Icon } from '@iconify/react';
import { Box, IconButton, Modal, Typography } from '@mui/material';
import type { ModalComponentProps } from './ModalComponent.interfaces';
import { StyledPaper } from './ModalComponent.styles';

export function ModalComponent(props: Readonly<ModalComponentProps>) {
  const {
    open,
    handleClose,
    title = 'Modal title',
    contentProps,
    disableBackdropClose = false,
  } = props;

  const handleModalClose = (
    _event: {},
    reason: 'backdropClick' | 'escapeKeyDown'
  ) => {
    if (disableBackdropClose && reason === 'backdropClick') return;
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleModalClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <StyledPaper>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          paddingX={3}
          paddingY={2}
        >
          <Box display="flex" flexGrow={1}>
            <Typography fontWeight={500} textAlign="center">
              {title}
            </Typography>
          </Box>
          <IconButton aria-label="close" onClick={handleClose}>
            <Icon icon="octicon:x-24" />
          </IconButton>
        </Box>
        {contentProps && (
          <Box paddingX={3} paddingBottom={3} maxHeight="70vh" overflow="auto">
            {contentProps}
          </Box>
        )}
      </StyledPaper>
    </Modal>
  );
}
