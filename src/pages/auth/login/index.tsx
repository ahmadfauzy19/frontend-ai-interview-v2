import { ButtonComponent } from '@/components/ButtonComponent';
import TextfieldComponent from '@/components/Form/TextfieldComponent';
import { Box, Divider, Link, Stack, Typography, useTheme } from '@mui/material';
import AuthCard from '../components/auth-card';
import useLogin from './Login.hooks';

const LoginPage = () => {
  const theme = useTheme();
  const { method, onSubmit, handleNavigateSignUp, isLoading } = useLogin();

  return (
    <AuthCard title="Login">
      <>
        <form onSubmit={method.handleSubmit(onSubmit)}>
          <Stack gap={1}>
            <TextfieldComponent
              control={method.control}
              name="email"
              label="Email"
              type="email"
              placeholder="Enter your email"
              required
              validationRegex="/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/"
              validationRegexMessage="Invalid email format"
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
              sx={{ textTransform: 'uppercase', borderRadius: '32px' }}
              type="submit"
              loading={isLoading}
            >
              Login
            </ButtonComponent>
          </Stack>
        </form>
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
              borderRadius: '32px',
            }}
            onClick={handleNavigateSignUp}
          >
            Sign Up
          </ButtonComponent>
        </Box>
      </>
    </AuthCard>
  );
};

export default LoginPage;
