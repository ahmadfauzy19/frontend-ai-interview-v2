import { useForm } from 'react-hook-form';
import type { LoginForm } from './Auth.interfaces';

const useLogin = () => {
  const method = useForm<LoginForm>({
    defaultValues: {
      username: '',
      password: '',
    },
    mode: 'onTouched',
  });

  const handleSubmit = () => {
    console.log('values: ', method.watch());
  };

  return { method, handleSubmit };
};

export default useLogin;
