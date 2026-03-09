import { useSnackbar } from '@/context/snackbar/SnackbarContext';
import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import type { SignUpForm } from '../Auth.interfaces';
import { useLocation } from 'react-router-dom'; 

const useSignUp = () => {
  const method = useForm<SignUpForm>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      role: 'CANDIDATE',
    },
    mode: 'onTouched',
  });

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();
  const location = useLocation();

  const from = location.state?.from;

  const onSubmit = async () => {
    setIsLoading(true);

    try {
      const values = method.getValues();
      const baseURL = import.meta.env.VITE_API_BASE_URL;

      await axios.post(`${baseURL}/auth/register`, values);
      setIsLoading(false);
      navigate("/", {
        state: { from }
      });

      showSnackbar('Account Created. Please login to continue', 'success');
    } catch (err) {
      console.error('Error Sign Up: ', err);
      setIsLoading(false);
      showSnackbar('Failed to create account. Please try again.', 'error');
    }
  };

  return { method, onSubmit, isLoading };
};

export default useSignUp;
