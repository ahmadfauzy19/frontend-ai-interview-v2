import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Divider,
  Grid,
  Chip,
  Paper,
} from "@mui/material";
import { Icon } from "@iconify/react";
import type { DetailInterview } from "@/pages/interviews/detail/DetailInterview.interfaces";

type InterviewDetailModalProps = {
  open: boolean;
  onClose: () => void;
  detailInterview?: DetailInterview | null;
};

const InterviewDetailModal = ({
  open,
  onClose,
  detailInterview,
}: InterviewDetailModalProps) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Icon icon="lucide:file-text" width={20} />
        Interview Detail
      </DialogTitle>

      <DialogContent dividers>
        <Box display="flex" flexDirection="column" gap={3}>
          
          {/* Basic Info */}
          <Grid container spacing={2}>
            <Grid size={6}>
              <Typography fontSize={12} color="text.secondary">
                Name
              </Typography>
              <Typography fontWeight={600}>
                {detailInterview?.name}
              </Typography>
            </Grid>

            <Grid size={6}>
              <Typography fontSize={12} color="text.secondary">
                Status
              </Typography>
              <Chip
                label={detailInterview?.status}
                color="warning"
                size="small"
              />
            </Grid>

            <Grid size={6}>
              <Typography fontSize={12} color="text.secondary">
                Role Target
              </Typography>
              <Typography fontWeight={500}>
                {detailInterview?.roleTarget}
              </Typography>
            </Grid>

            <Grid size={6}>
              <Typography fontSize={12} color="text.secondary">
                Level Target
              </Typography>
              <Typography fontWeight={500}>
                {detailInterview?.levelTarget}
              </Typography>
            </Grid>

            <Grid size={12}>
              <Typography fontSize={12} color="text.secondary">
                Technology
              </Typography>
              <Typography fontWeight={500}>
                {detailInterview?.technology}
              </Typography>
            </Grid>
          </Grid>

          <Divider />

          {/* Context */}
          <Box>
            <Typography
              fontWeight={600}
              display="flex"
              alignItems="center"
              gap={1}
            >
              <Icon icon="lucide:info" width={18} />
              Context
            </Typography>

            <Typography mt={1}>
              {detailInterview?.context}
            </Typography>
          </Box>

          {/* Objective */}
          <Box>
            <Typography
              fontWeight={600}
              display="flex"
              alignItems="center"
              gap={1}
            >
              <Icon icon="lucide:target" width={18} />
              Objective
            </Typography>

            <Typography mt={1} whiteSpace="pre-line">
              {detailInterview?.objective}
            </Typography>
          </Box>

          <Divider />

          {/* Questions */}
          <Box>
            <Typography
              fontWeight={600}
              display="flex"
              alignItems="center"
              gap={1}
              mb={2}
            >
              <Icon icon="lucide:help-circle" width={18} />
              Questions
            </Typography>

            <Box display="flex" flexDirection="column" gap={2}>
              {detailInterview?.questions?.map((q) => (
                <Paper
                  key={q.id}
                  elevation={1}
                  sx={{
                    padding: 2,
                    borderRadius: 2,
                  }}
                >
                  <Typography
                    fontWeight={600}
                    color="primary"
                    mb={0.5}
                  >
                    Question {q.orderNumber}
                  </Typography>

                  <Typography fontSize={14}>
                    {q.questionText}
                  </Typography>
                </Paper>
              ))}
            </Box>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} variant="contained">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default InterviewDetailModal;