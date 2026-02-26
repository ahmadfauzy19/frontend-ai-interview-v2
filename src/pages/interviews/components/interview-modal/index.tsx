import { ButtonComponent } from '@/components/ButtonComponent';
import AutocompleteComponent from '@/components/Form/AutocompleteComponent';
import TextfieldComponent from '@/components/Form/TextfieldComponent';
import { ModalComponent } from '@/components/ModalComponent';
import { Box, Grid, Stack } from '@mui/material';
import { useEffect } from 'react';
import { purposeOptions } from './InterviewModal.const';
import useInterviewModal from './InterviewModal.hooks';

const InterviewModal = ({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) => {
  const { method, onSubmit } = useInterviewModal(handleClose);

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
                  <ButtonComponent variant="contained" sx={{ borderRadius: 2 }}>
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
  );
};

export default InterviewModal;
