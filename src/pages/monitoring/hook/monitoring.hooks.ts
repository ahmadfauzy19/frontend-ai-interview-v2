import { useEffect, useState } from 'react';
import axiosUtils from '@/utils/axiosUtils';

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

  const fetchMonitoring = async () => {
    try {
      setLoading(true);

      const response = await axiosUtils.get<MonitoringResponse>(
        'monitoring',
        {
          params: {
            page: page - 1,
            size: rowsPerPage,
            search,
            sortBy: sortBy ? [sortBy] : undefined,
            direction: direction ? [direction] : undefined,
          },
        }
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
        fetchMonitoring();
    }, [page, rowsPerPage, search, sortBy, direction]);

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