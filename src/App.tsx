import { ThemeProvider } from '@mui/material';
import AppRoutes from './routes/routes';
import { mainTheme } from './styles/theme/theme';

function App() {
  return (
    <ThemeProvider theme={mainTheme}>
      <AppRoutes />
    </ThemeProvider>
  );
}

export default App;
