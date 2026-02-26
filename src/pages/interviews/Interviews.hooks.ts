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

  async function fetchInterviews() {
    const response = await axiosUtils.get('/interviews');
    return response.data;
  }
  useEffect(() => {
    setIsLoading(true);
    fetchInterviews().then(data => {
      setInterviewData(data);
      setIsLoading(false);
    });
  }, []);

  return { openModal, handleOpenModal, isLoading, interviewData };
};

export default useInterviews;
