import { useAuth } from '@/context/auth/AuthContext';
import { useSnackbar } from '@/context/snackbar/SnackbarContext';
import axiosUtils from '@/utils/axiosUtils';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import type { InterviewForm } from '../../Interviews.interfaces';

const useInterviewModal = (
  handleClose: () => void,
  refetch: () => void,
  interviewId?: string,
  isEdit?: boolean
) => {
  const method = useForm<InterviewForm>({
    mode: 'onSubmit',
  });

  const { showSnackbar } = useSnackbar();
  const { userData } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  // FETCH DETAIL (EDIT MODE)
  useEffect(() => {
    if (!isEdit || !interviewId) return;

    const fetchDetail = async () => {
      try {
        setIsLoading(true);

        const res = await axiosUtils.get(`/interviews/${interviewId}`);
        const data = res.data;

        method.reset({
          name: data.name,
          description: data.description,
          companyNamePartner: data.companyNamePartner,
          context: data.context,
          objective: data.objective,
          roleTarget: data.roleTarget,
          levelTarget: data.levelTarget,
          technology: data.technology,
          purpose: data.purpose,
          number: data.questions?.length || 1,
          language: data.language,
        });
      } catch (err) {
        console.error('Error fetch detail:', err);
        showSnackbar('Failed to load interview detail', 'error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetail();
  }, [interviewId, isEdit]);

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      const value = method.getValues();

      const payload: InterviewForm = {
        ...value,
        createdBy: userData.userId,
        number: Number(value.number),
      };

      if (isEdit && interviewId) {
        await axiosUtils.put(`/interviews/${interviewId}`, payload);

        showSnackbar('Interview Updated Successfully', 'success');
      } else {
        await axiosUtils.post('/interviews', payload);

        showSnackbar('Interview Created Successfully', 'success');
      }

      handleClose();
      refetch();
    } catch (err) {
      console.error('Error Save Interview: ', err);
      showSnackbar('Failed to save interview. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return { method, onSubmit, isLoading };
};

export default useInterviewModal;