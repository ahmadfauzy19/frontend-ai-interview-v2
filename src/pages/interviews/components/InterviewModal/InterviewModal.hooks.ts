import { useAuth } from '@/context/auth/AuthContext';
import { useSnackbar } from '@/context/snackbar/SnackbarContext';
import axiosUtils from '@/utils/axiosUtils';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { InterviewForm } from '../../Interviews.interfaces';

const useInterviewModal = (handleClose: () => void, refetch: () => void) => {
  const method = useForm<InterviewForm>({
    mode: 'onSubmit',
  });
  const { showSnackbar } = useSnackbar();
  const { userData } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      const value = method.getValues();
      const payload: InterviewForm = {
        ...value,
        createdBy: userData.userId,
        number: Number(value.number),
      };

      await axiosUtils.post('/interviews', payload);
      showSnackbar('Interview Created Successfully', 'success');
      handleClose();
      setIsLoading(false);
      refetch();
    } catch (err) {
      console.error('Error Create Interview: ', err);
      showSnackbar('Failed to create interview. Please try again.', 'error');
      setIsLoading(false);
    }
  };

  return { method, onSubmit, isLoading };
};

export default useInterviewModal;
