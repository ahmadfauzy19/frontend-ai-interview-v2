import axiosUtils from '@/utils/axiosUtils';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { CandidateAnswer } from './InterviewAnswer.interfaces';

const useInterviewAnswer = () => {
  const [answerCandidate, setAnswerCandidate] = useState<CandidateAnswer>();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingDownload, setIsLoadingDownload] = useState(false);
  const { userId, id } = useParams();

  async function fetchCandidateAnswer() {
    setIsLoading(true);
    const res = await axiosUtils.get(`/answers/candidate-result/${userId}`);
    setAnswerCandidate(res.data);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchCandidateAnswer();
  }, [userId]);

  const handleDownload = async (fileName: string) => {
    try {
      setIsLoadingDownload(true);
      const res = await axiosUtils.get(`/answers/download/${fileName}`, {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));

      const link = document.createElement('a');
      link.href = url;

      link.setAttribute('download', fileName);

      document.body.appendChild(link);
      link.click();

      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(url);

      setIsLoadingDownload(false);
    } catch (error) {
      console.error('Download error:', error);
    }
  };

  return {
    answerCandidate,
    isLoading,
    id,
    handleDownload,
    isLoadingDownload,
  };
};

export default useInterviewAnswer;
