import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import type { LoginForm } from '../Auth.interfaces';

const useLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const method = useForm<LoginForm>({
    defaultValues: {
      username: '',
      password: '',
    },
    mode: 'onTouched',
  });

  const onSubmit = () => {
    const watchedValues = method.watch();
    console.log('values: ', watchedValues);

    login({
      username: watchedValues.username,
    });

    navigate('/interviews');
  };

  const handleNavigateSignUp = () => {
    navigate('/sign-up');
  };

  return { method, onSubmit, handleNavigateSignUp };
};

export default useLogin;
