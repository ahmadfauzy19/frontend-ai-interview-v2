export interface ModalComponentProps {
  title?: string;
  open: boolean;
  handleClose: () => void;
  contentProps?: React.ReactNode;
  disableBackdropClose?: boolean;
}
