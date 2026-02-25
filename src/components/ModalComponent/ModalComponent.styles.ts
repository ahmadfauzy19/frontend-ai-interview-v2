import { Paper, styled } from '@mui/material';

export const StyledPaper = styled(Paper)(({ theme }) => ({
  position: 'absolute',
  borderRadius: '12px',
  ...theme.typography.body2,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  border: 'none',
  boxShadow: 'none',
}));
