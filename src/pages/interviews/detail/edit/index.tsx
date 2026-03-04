import { ButtonComponent } from '@/components/ButtonComponent';
import AutocompleteComponent from '@/components/Form/AutocompleteComponent';
import TextfieldComponent from '@/components/Form/TextfieldComponent';
import { Icon } from '@iconify/react';
import { Box, Grid, Stack, Typography, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { purposeOptions } from '../../components/InterviewModal/InterviewModal.const';
import useEditInterview from './EditInterview.hooks';

const EditInterviewPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { method, onSubmit } = useEditInterview();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.primary.light,
        padding: 2,
        borderRadius: 3,
        gap: 3,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box display="flex" flexDirection="column" gap={1}>
        <ButtonComponent
          variant="text"
          sx={{
            '&:hover': {
              backgroundColor: 'transparent',
            },
            padding: 0,
            fontSize: 14,
            width: 'fit-content',
          }}
          startIcon={<Icon icon="bx:left-arrow-alt" />}
          onClick={handleBack}
        >
          Back to summary
        </ButtonComponent>
        <Typography fontSize={24} fontWeight={600}>
          Edit Interview
        </Typography>
      </Box>
      <form
        onSubmit={method.handleSubmit(onSubmit)}
        style={{
          backgroundColor: theme.palette.background.paper,
          padding: 15,
          borderRadius: 8,
        }}
      >
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
    </Box>
  );
};

export default EditInterviewPage;
