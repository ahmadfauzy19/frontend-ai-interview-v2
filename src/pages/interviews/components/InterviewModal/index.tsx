import { ButtonComponent } from '@/components/ButtonComponent';
import AutocompleteComponent from '@/components/Form/AutocompleteComponent';
import TextfieldComponent from '@/components/Form/TextfieldComponent';
import { ModalComponent } from '@/components/ModalComponent';
import { Box, Grid, Stack } from '@mui/material';
import { useEffect } from 'react';
import { purposeOptions } from './InterviewModal.const';
import useInterviewModal from './InterviewModal.hooks';
import { Icon } from '@iconify/react';

const InterviewModal = ({
  open,
  handleClose,
  refetch,
}: {
  open: boolean;
  handleClose: () => void;
  refetch: () => void;
}) => {
  const { method, onSubmit, isLoading } = useInterviewModal(
    handleClose,
    refetch
  );

  useEffect(() => {
    method.reset();
  }, [open]);

  return (
    <ModalComponent
      open={open}
      handleClose={handleClose}
      title="Create an Interview"
      contentProps={
        <form onSubmit={method.handleSubmit(onSubmit)}>
          <Stack spacing={4} width={{ xs: '90vw', md: 800 }}>
            <Grid container spacing={4}>
              
              {/* Interview Name */}
              <Grid size={{ xs: 12, md: 6 }}>
                <TextfieldComponent
                  control={method.control}
                  name="name"
                  label="Interview Name"
                  placeholder="Name of the Interview"
                  required
                  fullWidth
                />
              </Grid>

              {/* Purpose */}
              <Grid size={{ xs: 12, md: 6 }}>
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

              {/* Context */}
              <Grid size={{ xs: 12, }}>
                <TextfieldComponent
                  control={method.control}
                  name="context"
                  label="Context"
                  placeholder="Context of the Interview"
                  required
                  fullWidth
                  multiline
                  minRows={4}
                  maxRows={10}
                />
              </Grid>

              {/* Objective */}
              <Grid size={{ xs: 12 }}>
                <TextfieldComponent
                  control={method.control}
                  name="objective"
                  label="Objective"
                  placeholder="Objective of the Interview"
                  required
                  fullWidth
                  multiline
                  minRows={4}
                  maxRows={10}
                />
              </Grid>

              {/* Role & Level */}
              <Grid size={{ xs: 12, md: 6 }}>
                <TextfieldComponent
                  control={method.control}
                  name="roleTarget"
                  label="Role Target"
                  placeholder="Backend, Frontend, etc"
                  required
                  fullWidth
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextfieldComponent
                  control={method.control}
                  name="levelTarget"
                  label="Level Target"
                  placeholder="Junior, Middle, etc"
                  required
                  fullWidth
                />
              </Grid>

              {/* Number & Technology */}
              <Grid size={{ xs: 12, md: 6 }}>
                <TextfieldComponent
                  control={method.control}
                  name="number"
                  label="Number of Questions"
                  placeholder="1"
                  required
                  fullWidth
                  format="number"
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextfieldComponent
                  control={method.control}
                  name="technology"
                  label="Technology"
                  placeholder="Spring Boot, React JS, etc"
                  required
                  fullWidth
                />
              </Grid>

              {/* Button */}
              <Grid size={{ xs: 12 }} display="flex" justifyContent="center">
                <Box display="flex" justifyContent="center" mt={1}>
                  <ButtonComponent
                    variant="contained"
                    sx={{ borderRadius: 2, px: 5, py: 1.2 }}
                    type="submit"
                    loading={isLoading}
                    startIcon={<Icon icon="material-symbols:save" />}
                  >
                    Save Interview
                  </ButtonComponent>
                </Box>
              </Grid>

            </Grid>
          </Stack>
        </form>
      }
    />
  );
};

export default InterviewModal;