import type { TableSorting } from '@/components/Table/TableComponent/TableComponent.interfaces';
import { useForm } from 'react-hook-form';

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

  const handleSortChange = (tSort: TableSorting) => {
    method.setValue('sort', tSort.sort);
    method.setValue('order', tSort.order);
  };

  return { method, handleSortChange };
};

export default useDetailInterview;
