import axiosUtils from '@/utils/axiosUtils';
import { useEffect, useState } from 'react';
import type { Interviews } from './Interviews.interfaces';

const useInterviews = () => {
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(!openModal);

  const [isLoading, setIsLoading] = useState(false);
  const [interviewData, setInterviewData] = useState<Interviews[]>([]);

  // pagination state
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  // filter state
  const [filters, setFilters] = useState({
    search: '',
    company: '',
    type: '',
    level: '',
    status: '',
  });

  const getInterviews = async () => {
    setIsLoading(true);
    try {
      // filter param kosong
      const cleanFilters = Object.fromEntries(
        Object.entries(filters).filter(
          ([_, value]) => value !== '' && value !== null && value !== undefined
        )
      );

      const response = await axiosUtils.get('/interviews', {
        params: {
          ...cleanFilters,
          page,
          size,
        },
      });

      setInterviewData(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Failed to fetch interviews:', error);
    } finally {
      setIsLoading(false);
    }
  };


  useEffect(() => {
    getInterviews();
  }, [page, size, filters]);

  return {
    openModal,
    handleOpenModal,
    interviewData,
    isLoading,
    getInterviews,

    // pagination
    page,
    setPage,
    size,
    setSize,
    totalPages,

    // filter
    filters,
    setFilters,
  };
};

export default useInterviews;
