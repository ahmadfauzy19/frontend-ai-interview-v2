import { useAuth } from '@/context/auth/AuthContext';
import InterviewCardLoading from '@/pages/interviews/components/InterviewCardLoading';
import {
  Box,
  Stack,
  Typography,
  Pagination,
  Select,
  MenuItem,
} from '@mui/material';
import { useForm } from 'react-hook-form';

import CreateInterviewCard from './components/CreateInterviewCard';
import InterviewCard from './components/InterviewCard';
import InterviewModal from './components/InterviewModal';
import useInterviews from './Interviews.hooks';

import { ButtonComponent } from '@/components/ButtonComponent';
import TextfieldComponent from '@/components/Form/TextfieldComponent';

type FilterForm = {
  search: string;
  company: string;
  type: string;
  level: string;
  status: string;
};

const InterviewsPage = () => {
  const {
    openModal,
    handleOpenModal,
    interviewData,
    isLoading,
    getInterviews,
    page,
    setPage,
    size,
    setSize,
    totalPages,
    setFilters,
  } = useInterviews();

  const { userData } = useAuth();

  const method = useForm<FilterForm>({
    defaultValues: {
      search: '',
      company: '',
      type: '',
      level: '',
      status: '',
    },
  });

  const onSubmit = (values: FilterForm) => {
    setPage(0);
    console.log('Filter values:', values);
    setFilters(values);
  };

  return (
    <Box
      flexGrow={1}
      sx={{
        backgroundColor: '#ffffff',
        minHeight: '100vh',
      }}
    >
      {/* HEADER */}
      <Box
        sx={{
          borderBottom: '1px solid #e5e7eb',
          pb: 2,
          mb: 3,
        }}
      >
        <Typography fontSize={24} fontWeight={600}>
          My Interview
        </Typography>
      </Box>

      {/* FILTER */}
      <form onSubmit={method.handleSubmit(onSubmit)}>
        <Box
          display="grid"
          gridTemplateColumns={{
            xs: '1fr',
            sm: '1fr 1fr',
            md: 'repeat(5, 1fr) auto',
          }}
          gap={2}
          mb={3}
        >
          <TextfieldComponent control={method.control} name="search" placeholder="Interview Title..." />
          <TextfieldComponent control={method.control} name="company" placeholder="Company" />
          <TextfieldComponent control={method.control} name="type" placeholder="Type" />
          <TextfieldComponent control={method.control} name="level" placeholder="Level" />
          <TextfieldComponent control={method.control} name="status" placeholder="Status" />

          {/* BUTTON GROUP */}
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1}
            alignItems="stretch"
            justifyContent="flex-end"
          >
            <ButtonComponent type="submit" sx={{ height: '100%' }}>
              Search
            </ButtonComponent>

            <ButtonComponent
              type="button"
              sx={{ height: '100%' }}
              onClick={() => {
                method.reset();
                setPage(0);

                setFilters({
                  search: '',
                  company: '',
                  type: '',
                  level: '',
                  status: '',
                });
              }}
            >
              Clear
            </ButtonComponent>
          </Stack>
        </Box>
      </form>


      {/* CONTENT BOX */}
      <Box
        sx={{
          border: '1px solid #e5e7eb',
          borderRadius: 2,
          p: 2,
          backgroundColor: '#fff',
        }}
      >
        {/* TOP BAR */}
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          justifyContent="space-between"
          alignItems={{ xs: 'flex-start', md: 'center' }}
          spacing={2}
          mb={2}
        >
          {/* SIZE */}
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography fontSize={14}>Show</Typography>
            <Select
              size="small"
              value={size}
              onChange={(e) => {
                setSize(Number(e.target.value));
                setPage(0);
              }}
            >
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={50}>50</MenuItem>
            </Select>
            <Typography fontSize={14}>Entries</Typography>
          </Stack>

          {/* PAGINATION */}
          <Pagination
            count={totalPages}
            page={page + 1}
            onChange={(_, value) => setPage(value - 1)}
            color="primary"
          />
        </Stack>

        {/* LIST */}
        <Box
          display="grid"
          gridTemplateColumns={{
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
            lg: 'repeat(5, 1fr)',
          }}
          gap={1}
        >
          {isLoading
            ? [...Array(size)].map((_, index) => (
                <InterviewCardLoading key={index} />
              ))
            : (
              <>
                {userData?.role !== 'CANDIDATE' && (
                  <CreateInterviewCard handleClick={handleOpenModal} />
                )}

                {interviewData.map((interview) => (
                  <InterviewCard
                    key={interview.id}
                    data={interview}
                    role={userData.role}
                  />
                ))}
              </>
            )}
        </Box>
      </Box>

      {/* MODAL */}
      <InterviewModal
        open={openModal}
        handleClose={handleOpenModal}
        refetch={getInterviews}
      />
    </Box>
  );
};

export default InterviewsPage;
