import SelectComponent from '@/components/Form/SelectComponent';
import SwitchComponent from '@/components/Form/SwitchComponent';
import { Icon } from '@iconify/react';
import { Box, Divider, Grid, Typography, useTheme } from '@mui/material';
import UserResponseCard from '../../components/UserResponseCard';
import UserResponseCardLoading from '../../components/UserResponseCardLoading';
import { filterOptions } from '../../DetailInterview.const';
import useDetailInterview from '../../DetailInterview.hooks';

/*
  Code yang dikomen itu karna penyesuaian data di BE dengan tampilan di FoloUp, jadi nanti kalo dari BE sudah dihandle bisa dinyalakan lagi
*/

const DetailInterviewLayout = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme();

  const { method, candidateList, isLoadingCandidateList , detailInterview} =
    useDetailInterview();

  return (
    <Box
      sx={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 3 }}
    >
      <Box display="flex" justifyContent="center" gap={2}>
        <Typography fontSize={18} fontWeight={700}>
          {detailInterview?.name}
        </Typography>
        <Divider orientation="vertical" flexItem />
        <Box display="flex" gap={1}>
          <Icon icon="material-symbols:person-outline" width={24} height={24} />
          <Typography>: {candidateList?.length || 0}</Typography>
        </Box>
        <Divider orientation="vertical" flexItem />
        <Box display="flex" gap={1} alignItems="center">
          <Typography fontSize={14}>Active</Typography>
          <SwitchComponent
            checked={method.watch('isActive')}
            size="small"
            onChange={() => {
              method.setValue('isActive', !method.watch('isActive'));
            }}
          />
        </Box>
      </Box>
      <Grid container spacing={2} sx={{ flexGrow: 1 }}>
        <Grid
          size={{ xs: 3, lg: 2 }}
          sx={{ display: 'flex', flexDirection: 'column' }}
        >
          <Box
            display="flex"
            flexDirection="column"
            gap={2}
            padding={2}
            border={`1px solid ${theme.palette.divider}`}
            borderRadius={2}
            flexGrow={1}
          >
            <Box>
              <SelectComponent
                control={method.control}
                name="filter"
                placeholder="Filter by"
                fullWidth
                options={filterOptions}
                startIcon={
                  <Icon
                    icon="lucide:filter"
                    color={theme.palette.text.secondary}
                  />
                }
              />
            </Box>
            {isLoadingCandidateList && <UserResponseCardLoading />}
            {!isLoadingCandidateList &&
              candidateList.map(item => (
                <UserResponseCard key={item.candidateId} data={item} />
              ))}
          </Box>
        </Grid>
        <Grid
          size={{ xs: 9, lg: 10 }}
          sx={{ display: 'flex', flexDirection: 'column' }}
        >
          {children}
        </Grid>
      </Grid>
    </Box>
  );
};

export default DetailInterviewLayout;
