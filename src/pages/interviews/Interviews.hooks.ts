import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { InterviewCreateForm } from './Interviews.interfaces';

const useInterviews = () => {
  const [openCreate, setOpenCreate] = useState(false);
  const method = useForm<InterviewCreateForm>({
    mode: 'onSubmit',
  });

  const handleOpenCreate = () => {
    method.reset();
    setOpenCreate(!openCreate);
  };

  const onSubmit = () => {
    const value = method.watch();
    console.log({ value });
    handleOpenCreate();
  };

  return { openCreate, handleOpenCreate, method, onSubmit };
};

export default useInterviews;
