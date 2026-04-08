import { useEffect, useState } from 'react';
import axiosUtils from '@/utils/axiosUtils';
import { useAuth } from '@/context/auth/AuthContext';

export interface MonitoringHistory {
  id: string;
  processId: string;
  interviewName: string;
  candidateName: string;
  taskName: string;
  startDate: string;
  endDate: string;
  status: string;
  messageError: string | null;
}

interface MonitoringResponse {
  content: MonitoringHistory[];
  totalElements: number;
}

export const useMonitoring = () => {
  const [data, setData] = useState<MonitoringHistory[]>([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalData, setTotalData] = useState(0);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<string[] | undefined>();
  const [direction, setDirection] = useState<
    ('asc' | 'desc')[]
    >();
  
  const { userData } = useAuth();
  const userId = userData?.userId;
  
  const fetchMonitoring = async () => {
    try {
      setLoading(true);

      const params: any = {
        page: page - 1,
        size: rowsPerPage,
        search: search || undefined,
        sortBy,
        direction,
      };

      if (
        userData?.role !== 'ADMIN' &&
        userData?.role !== 'INTERVIEWER'
      ) {
        params.userId = userId;
      }

      const response = await axiosUtils.get<MonitoringResponse>(
        'monitoring',
        { params }
      );

      setData(response.data.content);
      setTotalData(response.data.totalElements);
    } catch (error) {
      console.error('Error fetch monitoring:', error);
    } finally {
      setLoading(false);
    }
  };

    useEffect(() => {
      if (userData) fetchMonitoring();
    }, [page, rowsPerPage, search, sortBy, direction, userData]);

  return {
    data,
    page,
    sortBy,
    direction,
    rowsPerPage,
    totalData,
    loading,
    search,
    setRowsPerPage,
    setPage,
    setSearch,
    setSortBy,
    setDirection,
  };
};