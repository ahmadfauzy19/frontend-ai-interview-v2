import TableListAnswer from "./components/TableListAnswer";
import { Box } from "@mui/material";

const ListAnswerPage = () => {
  return (
        <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TableListAnswer />
        </Box>
    );
};

export default ListAnswerPage;