import { useForm } from 'react-hook-form';
import type { LoginForm } from './Auth.interfaces';
import { useNavigate } from 'react-router-dom';
import { storageService } from '../../utils/storageUtils';

const useLogin = () => {
  const navigate = useNavigate();
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

    storageService.set('uid', {
      isLogin: true,
      username: watchedValues.username,
    });

    navigate('/interviews');
  };

  return { method, onSubmit };
};

export default useLogin;
