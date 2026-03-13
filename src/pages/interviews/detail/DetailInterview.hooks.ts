import type { TableSorting } from '@/components/Table/TableComponent/TableComponent.interfaces';
import axiosUtils from '@/utils/axiosUtils';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import type { CandidateInterview, DetailInterview, SummaryRecommendation } from './DetailInterview.interfaces';

const useDetailInterview = () => {
  const method = useForm({
    values: {
      isActive: true,
      filter: '',
      page: 1,
      size: 10,
      sort: '',
      order: '',
    },
  });

  const { id } = useParams();
  const [candidateList, setCandidateList] = useState<CandidateInterview[]>([]);
  const [detailInterview, setDetailInterview] = useState<DetailInterview>();
  const [summaryRecommandation, setSummaryRecommandation] =useState<SummaryRecommendation | null>(null);
  const [isLoadingCandidateList, setIsLoadingCandidateList] = useState(true);

  const handleSortChange = (tSort: TableSorting) => {
    method.setValue('sort', tSort.sort);
    method.setValue('order', tSort.order);
  };

  async function fetchCandidateList() {
    // setIsLoadingCandidateList(true);
    const res = await axiosUtils.get(`/answers/list-candidate/${id}`);
    setCandidateList(res.data);
    // setIsLoadingCandidateList(false);
  }

  async function fetchDetailInterview(id:any) {
    // setIsLoadingCandidateList(true);
    const res = await axiosUtils.get(`/interviews/${id}`);
    setDetailInterview(res.data);
    // setIsLoadingCandidateList(false);
  }

  async function fetchSummaryRecommandation(id:any, purpose: String) {
    try {
      setIsLoadingCandidateList(true);

      const res = await axiosUtils.get(`/summary/hiring/${id}`, {
        params: { purpose },
      });

      setSummaryRecommandation(res.data);
    } catch (error) {
      console.error("Error fetching summary recommendation:", error);
    } finally {
      setIsLoadingCandidateList(false);
    }
  }

  useEffect(() => {
    fetchCandidateList();
    fetchDetailInterview(id);
  }, [id]);

  useEffect(() => {
  if (detailInterview?.purpose && id) {
    fetchSummaryRecommandation(id, detailInterview.purpose);
  }
}, [detailInterview, id]);

  return { method, handleSortChange, candidateList, isLoadingCandidateList, detailInterview, summaryRecommandation };
};

export default useDetailInterview;
