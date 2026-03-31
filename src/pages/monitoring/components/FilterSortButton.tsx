import {
  Button,
  Popover,
  Box,
  MenuItem,
  Select,
  IconButton,
  Typography,
  Divider,
  Stack,
  Chip,
} from '@mui/material';
import { useState } from 'react';
import { Icon } from '@iconify/react';

const SORT_FIELDS = [
  { label: 'Process ID', value: 'processId' },
  { label: 'Interview Name', value: 'interviewName' },
  { label: 'Candidate Name', value: 'candidateName' },
  { label: 'Start Date', value: 'startDate' },
  { label: 'End Date', value: 'endDate' },
  { label: 'Status', value: 'status' },
];

const FilterSortButton = ({ sortConfig, setSortConfig }: any) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleAddSort = () => {
    setSortConfig([
      ...sortConfig,
      { field: 'startDate', direction: 'desc' },
    ]);
  };

  const handleChange = (index: number, key: string, value: any) => {
    const updated = [...sortConfig];
    updated[index][key] = value;
    setSortConfig(updated);
  };

  const handleRemove = (index: number) => {
    const updated = sortConfig.filter((_: any, i: number) => i !== index);
    setSortConfig(updated);
  };

  return (
    <>
      <Button
        variant="contained"
        startIcon={<Icon icon="mdi:tune-variant" />}
        onClick={(e) => setAnchorEl(e.currentTarget)}
        sx={{
          borderRadius: 2,
          textTransform: 'none',
          fontWeight: 600,
          px: 2,
        }}
      >
        Filter & Sort
      </Button>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        slotProps={{
            paper: {
            sx: {
                borderRadius: 2.5,
                mt: 1,
                mr: 1,
                boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                border: '1px solid #e5e7eb',
            },
            },
        }}
        >
        <Box sx={{ p: 3, width: 340 }}>
          {/* HEADER */}
          <Stack direction="row" justifyContent="space-between" mb={2}>
            <Typography fontWeight={700} fontSize={16}>
              Sort Configuration
            </Typography>

            {sortConfig.length > 0 && (
              <Chip
                label={`${sortConfig.length} active`}
                size="small"
                color="primary"
              />
            )}
          </Stack>

          <Divider sx={{ mb: 2 }} />

          {/* LIST */}
          <Stack spacing={2}>
            {sortConfig.length === 0 && (
              <Typography
                variant="body2"
                color="text.secondary"
                textAlign="center"
              >
                No sorting applied
              </Typography>
            )}

            {sortConfig.map((item: any, index: number) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  gap: 1,
                  alignItems: 'center',
                  p: 1.5,
                  borderRadius: 2,
                  border: '1px solid #e5e7eb',
                  background: '#f9fafb',
                }}
              >
                {/* FIELD */}
                <Select
                  size="small"
                  value={item.field}
                  onChange={(e) =>
                    handleChange(index, 'field', e.target.value)
                  }
                  fullWidth
                  sx={{
                    background: '#fff',
                    borderRadius: 1.5,
                  }}
                >
                  {SORT_FIELDS.map((f) => (
                    <MenuItem key={f.value} value={f.value}>
                      {f.label}
                    </MenuItem>
                  ))}
                </Select>

                {/* DIRECTION */}
                <Select
                  size="small"
                  value={item.direction}
                  onChange={(e) =>
                    handleChange(index, 'direction', e.target.value)
                  }
                  sx={{
                    width: 90,
                    background: '#fff',
                    borderRadius: 1.5,
                  }}
                >
                  <MenuItem value="asc">
                    ↑ ASC
                  </MenuItem>
                  <MenuItem value="desc">
                    ↓ DESC
                  </MenuItem>
                </Select>

                {/* REMOVE */}
                <IconButton
                  onClick={() => handleRemove(index)}
                  sx={{
                    color: '#ef4444',
                    '&:hover': {
                      background: '#fee2e2',
                    },
                  }}
                >
                  <Icon icon="mdi:close" />
                </IconButton>
              </Box>
            ))}
          </Stack>

          {/* ACTION */}
          <Button
            fullWidth
            onClick={handleAddSort}
            startIcon={<Icon icon="mdi:plus" />}
            sx={{
              mt: 3,
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 600,
              background: '#f1f5f9',
              color: '#0f172a',
              '&:hover': {
                background: '#e2e8f0',
              },
            }}
          >
            Add Sorting
          </Button>
        </Box>
      </Popover>
    </>
  );
};

export default FilterSortButton;