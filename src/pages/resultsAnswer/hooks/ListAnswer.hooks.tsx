import { useEffect, useState } from 'react';
import axiosUtils from '@/utils/axiosUtils';
import { useAuth } from '@/context/auth/AuthContext';

export interface CandidateAnswer {
  interviewId: string;
  candidateId: string;
  interviewName: string;
  name: string;
  totalScore: number;
  recommendation: string;
  summaryReason: string;
  progress: string;
  validated: string;
  avgBreakTime: number;
  avgAnswerTime: number;
}

export const useListAnswer = () => {
  const [data, setData] = useState<CandidateAnswer[]>([]);
  const [loading, setLoading] = useState(false);

  const { userData } = useAuth();
  const userId = userData?.userId;

  const fetchAnswers = async () => {
    try {
      setLoading(true);
      const response = await axiosUtils.get<CandidateAnswer[]>(
        `answers/list-candidate-answer/${userId}`
      );

      setData(response.data);
    } catch (error) {
      console.error('Error fetch answers:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) fetchAnswers();
  }, [userId]);

  return {
    data,
    loading,
  };
};