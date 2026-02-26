import { useForm } from 'react-hook-form';
import type { SignUpForm } from '../Auth.interfaces';

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

  const onSubmit = () => {
    console.log(method.getValues());
  };

  return { method, onSubmit };
};

export default useSignUp;
