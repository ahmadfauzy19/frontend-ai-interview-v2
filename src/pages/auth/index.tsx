import { Box, Divider, Link, Stack, Typography, useTheme } from '@mui/material';
import assets from '../../assets';
import { TextfieldComponent } from '../../components/TextfieldComponent';
import Navbar from '../../layout/navbar';
import useLogin from './Auth.hooks';
import { ButtonComponent } from '../../components/ButtonComponent';

const AuthPage = () => {
  const theme = useTheme();
  const { method, handleSubmit } = useLogin();

  return (
    <Stack>
      <Navbar />
      <Box
        sx={{
          paddingY: 4,
          paddingX: 3,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 5,
          flexDirection: { xs: 'column', md: 'row' },
        }}
      >
        <Box>
          <img
            src={assets.imageMan}
            alt="Interview Illustration"
            style={{
              width: 'auto',
              height: 'auto',
              maxWidth: '100%',
              maxHeight: '100%',
            }}
          />
        </Box>
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
              Login
            </Typography>
          </Box>
          <Stack gap={1}>
            <TextfieldComponent
              control={method.control}
              name="username"
              label="Username or Email"
              type="text"
              placeholder="Enter your username/email"
              required
            />
            <TextfieldComponent
              control={method.control}
              name="password"
              label="Password"
              type="password"
              placeholder="Enter your password"
              required
            />
            <Link
              href="/forgot-password"
              underline="none"
              sx={{
                fontSize: '14px',
                display: 'flex',
                justifyContent: 'flex-end',
                color: theme.palette.error.main,
              }}
            >
              Forgot password?
            </Link>
            <ButtonComponent
              variant="contained"
              size="small"
              sx={{ textTransform: 'uppercase' }}
              onClick={handleSubmit}
            >
              Login
            </ButtonComponent>
          </Stack>
          <Divider
            flexItem
            sx={{ backgroundColor: theme.palette.text.secondary }}
          />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              width: '100%',
            }}
          >
            <Typography
              sx={{
                fontSize: '14px',
                color: theme.palette.text.secondary,
                fontWeight: 500,
                textAlign: 'center',
              }}
            >
              Don't have account already?
            </Typography>
            <ButtonComponent
              variant="contained"
              size="small"
              type="submit"
              sx={{
                textTransform: 'uppercase',
                backgroundColor: theme.palette.secondary.main,
                color: 'white',
              }}
            >
              Sign Up
            </ButtonComponent>
          </Box>
        </Box>
      </Box>
    </Stack>
  );
};

export default AuthPage;
