import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import type { EditInterviewForm } from './EditInterview.interfaces';

const useEditInterview = () => {
  const method = useForm<EditInterviewForm>({
    mode: 'onSubmit',
  });
  const { id } = useParams();

  console.log({ id });

  const onSubmit = async () => {
    console.log(method.getValues());
  };

  return { method, onSubmit };
};

export default useEditInterview;
