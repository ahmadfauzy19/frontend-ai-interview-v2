import { ButtonComponent } from '@/components/ButtonComponent';
import SelectComponent from '@/components/Form/SelectComponent';
import TextfieldComponent from '@/components/Form/TextfieldComponent';
import { Link, Stack } from '@mui/material';
import AuthCard from '../components/auth-card';
import { roleOptions } from './SignUp.const';
import useSignUp from './SignUp.hooks';

const SignUpPage = () => {
  const { method, onSubmit, isLoading } = useSignUp();

  return (
    <AuthCard title="Sign Up">
      <form onSubmit={method.handleSubmit(onSubmit)}>
        <Stack gap={1}>
          <TextfieldComponent
            control={method.control}
            name="name"
            label="Name"
            type="text"
            placeholder="Enter your name"
            required
          />
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
          <SelectComponent
            control={method.control}
            name="role"
            label="Role"
            required
            options={roleOptions}
            fullWidth
            placeholder="Role"
          />
          <Link
            href="/"
            underline="none"
            sx={{
              fontSize: '14px',
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            Already have account?
          </Link>
          <ButtonComponent
            variant="contained"
            size="small"
            sx={{ textTransform: 'uppercase' }}
            type="submit"
            loading={isLoading}
          >
            Sign Up
          </ButtonComponent>
        </Stack>
      </form>
    </AuthCard>
  );
};

export default SignUpPage;
