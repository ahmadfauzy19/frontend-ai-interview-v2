import axiosUtils from '@/utils/axiosUtils';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { InterviewDetail } from './CallInterview.interfaces';

const useCallInterview = () => {
  const { id } = useParams();
  const [interview, setInterview] = useState<InterviewDetail>();
  const [isLoading, setIsLoading] = useState(false);

  async function getInterview() {
    setIsLoading(true);

    try {
      const response = await axiosUtils.get(`/interviews/${id}`);
      setInterview(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Failed to fetch interviews:', error);
    }
  }

  useEffect(() => {
    getInterview();
  }, []);

  return { interview, isLoading };
};

export default useCallInterview;
