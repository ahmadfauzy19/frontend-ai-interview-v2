import { Box, Stack, Typography, useTheme } from '@mui/material';

const AuthCard = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 3,
        padding: 3,
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 4,
        textAlign: 'center',
      }}
    >
      <Box>
        <Stack direction="row" gap={0.5}>
          <Typography
            fontSize={24}
            fontWeight={600}
            color={theme.palette.primary.main}
          >
            AI
          </Typography>
          <Typography
            fontSize={24}
            fontWeight={600}
            color={theme.palette.secondary.main}
          >
            Interview
          </Typography>
        </Stack>
        <Typography
          fontSize={14}
          color={theme.palette.text.secondary}
          textTransform="uppercase"
          fontWeight={300}
        >
          {title}
        </Typography>
      </Box>
      {children}
    </Box>
  );
};

export default AuthCard;
