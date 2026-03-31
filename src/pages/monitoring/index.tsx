import { Box, Typography } from '@mui/material';
import TableMonitoring from './components/TableMonitoring';

const MonitoringPage = ()=> {
    return (
        <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TableMonitoring />
        </Box>
    );
}

export default MonitoringPage;
