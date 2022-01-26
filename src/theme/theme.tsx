import { createTheme } from '@mui/material';
import typography from './typography';

const theme = createTheme({
  palette: {
    mode: 'light'
  },
  typography
});

export default theme;
