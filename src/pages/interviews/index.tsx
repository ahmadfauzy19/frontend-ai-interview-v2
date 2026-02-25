import { Box, Grid, Stack, Typography } from '@mui/material';
import CreateInterviewCard from '../../components/CreateInterviewCard';
import InterviewCard from '../../components/InterviewCard';
import { ModalComponent } from '../../components/ModalComponent';
import useInterviews from './Interviews.hooks';
import TextfieldComponent from '../../components/Form/TextfieldComponent';
import { ButtonComponent } from '../../components/ButtonComponent';
import AutocompleteComponent from '../../components/Form/AutocompleteComponent';
import { purposeOptions } from './Interview.const';

const InterviewsPage = () => {
  const { openCreate, handleOpenCreate, method, onSubmit } = useInterviews();

  return (
    <Box flexGrow={1}>
      <Stack gap={3}>
        <Typography fontSize={24} fontWeight={600}>
          My Interview
        </Typography>
        <Box display="flex" gap={3} flexWrap="wrap">
          <CreateInterviewCard handleClick={handleOpenCreate} />
          <InterviewCard interviewName="Interview 1" responseTotal={1} />
        </Box>
      </Stack>

      <ModalComponent
        open={openCreate}
        handleClose={handleOpenCreate}
        title="Create an Interview"
        contentProps={
          <form onSubmit={method.handleSubmit(onSubmit)}>
            <Stack gap={2} width={{ xs: '80vw', md: 'auto' }}>
              <Grid container spacing={2}>
                <Grid size={6}>
                  <TextfieldComponent
                    control={method.control}
                    name="name"
                    label="Interview Name"
                    placeholder="Name of the Interview"
                    required
                    fullWidth
                  />
                </Grid>
                <Grid size={6}>
                  <TextfieldComponent
                    control={method.control}
                    name="context"
                    label="Context"
                    placeholder="Context of the Interview"
                    required
                    fullWidth
                  />
                </Grid>
                <Grid size={12}>
                  <TextfieldComponent
                    control={method.control}
                    name="objective"
                    label="Objective"
                    placeholder="Objective of the Interview"
                    required
                    fullWidth
                    multiline
                    rows={4}
                  />
                </Grid>
                <Grid size={6}>
                  <AutocompleteComponent
                    control={method.control}
                    name="purpose"
                    label="Purpose"
                    placeholder="Purpose of the Interview"
                    required
                    fullWidth
                    options={purposeOptions}
                  />
                </Grid>
                <Grid size={6}>
                  <TextfieldComponent
                    control={method.control}
                    name="roleTarget"
                    label="Role Target"
                    placeholder="Backend, Frontend, etc"
                    required
                    fullWidth
                  />
                </Grid>
                <Grid size={6}>
                  <TextfieldComponent
                    control={method.control}
                    name="levelTarget"
                    label="Level Target"
                    placeholder="Junior, Middle, etc"
                    required
                    fullWidth
                  />
                </Grid>
                <Grid size={6}>
                  <TextfieldComponent
                    control={method.control}
                    name="number"
                    label="Number of Question"
                    placeholder="1"
                    required
                    fullWidth
                    format="number"
                  />
                </Grid>
                <Grid size={12}>
                  <TextfieldComponent
                    control={method.control}
                    name="technology"
                    label="Technology"
                    placeholder="Spring Boot, React Js, etc"
                    required
                    fullWidth
                  />
                </Grid>
                <Grid size={12}>
                  <Box display="flex" gap={3} justifyContent="center">
                    <ButtonComponent
                      variant="contained"
                      sx={{ borderRadius: 2 }}
                    >
                      Generate Questions
                    </ButtonComponent>
                    <ButtonComponent
                      variant="contained"
                      sx={{ borderRadius: 2, paddingX: 4 }}
                      type="submit"
                    >
                      Save
                    </ButtonComponent>
                  </Box>
                </Grid>
              </Grid>
            </Stack>
          </form>
        }
      />
    </Box>
  );
};

export default InterviewsPage;
