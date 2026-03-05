import { useAuth } from '@/context/auth/AuthContext';
import { useSnackbar } from '@/context/snackbar/SnackbarContext';
import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import type { LoginForm } from '../Auth.interfaces';

const useLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { showSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);

  const method = useForm<LoginForm>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onTouched',
  });

  const onSubmit = async () => {
    setIsLoading(true);

    try {
      const values = method.getValues();
      const baseURL = import.meta.env.VITE_API_BASE_URL;

      const res = await axios.post(`${baseURL}/auth/login`, values);

      const data = res.data;
      login(data);

      navigate('/interviews');
      showSnackbar('Login Success', 'success');

      setIsLoading(false);
    } catch (err) {
      console.error('Error Login: ', err);

      if (axios.isAxiosError(err) && err.response?.status === 500) {
        showSnackbar('Login Failed. Please try again.', 'error');
      } else {
        showSnackbar('Login Failed. Email or password is incorrect', 'error');
      }

      setIsLoading(false);
    }
  };

  const handleNavigateSignUp = () => {
    navigate('/sign-up');
  };

  return { method, onSubmit, handleNavigateSignUp, isLoading };
};

export default useLogin;
