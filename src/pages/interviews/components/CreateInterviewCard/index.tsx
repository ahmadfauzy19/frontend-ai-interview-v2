import { Icon } from '@iconify/react';
import { Box, Typography } from '@mui/material';

const CreateInterviewCard = ({ handleClick }: { handleClick?: () => void }) => {
  return (
    <Box
      component="div"
      sx={{
        height: 230,
        width: 170,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        border: '2px dashed black',
        borderRadius: 2,
        padding: 3,
        cursor: 'pointer',
        '&:hover': {
          scale: 1.1,
        },
        transition: 'all',
        animationDuration: '300ms',
        transitionDuration: '300ms',
      }}
      onClick={handleClick}
    >
      <Icon icon="mdi:plus" width={120} height={120} />
      <Typography>Create an Interview</Typography>
    </Box>
  );
};

export default CreateInterviewCard;
