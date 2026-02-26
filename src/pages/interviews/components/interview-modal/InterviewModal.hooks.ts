import { useForm } from 'react-hook-form';
import type { InterviewForm } from '../../Interviews.interfaces';

const useInterviewModal = (handleClose: () => void) => {
  const method = useForm<InterviewForm>({
    mode: 'onSubmit',
  });

  const onSubmit = () => {
    const value = method.watch();
    console.log({ value });
    handleClose();
  };

  return { method, onSubmit };
};

export default useInterviewModal;
