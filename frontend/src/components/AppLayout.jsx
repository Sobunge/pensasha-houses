// src/components/Layout/AppLayout.jsx
import { Box } from '@mui/material';
import MainFooter from './MainFooter';

function AppLayout({ children }) {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Box component="main" flex="1">
        {children}
      </Box>
      <MainFooter />
    </Box>
  );
}

export default AppLayout;
