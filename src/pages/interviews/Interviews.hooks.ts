import axiosUtils from '@/utils/axiosUtils';
import { useEffect, useState } from 'react';
import type { Interviews } from './Interviews.interfaces';

const useInterviews = () => {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(!openModal);
  };

  const [isLoading, setIsLoading] = useState(false);
  const [interviewData, setInterviewData] = useState<Interviews[]>([]);

  const getInterviews = async () => {
    setIsLoading(true);
    try {
      const response = await axiosUtils.get('/interviews');
      setInterviewData(response.data);
    } catch (error) {
      console.error('Failed to fetch interviews:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getInterviews();
  }, []);

  return {
    openModal,
    handleOpenModal,
    isLoading,
    interviewData,
    getInterviews,
  };
};

export default useInterviews;
