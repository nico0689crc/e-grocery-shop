import { Box, CircularProgress } from '@mui/material';

const Loading = () => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexGrow: 1,
      flexShrink: 1,
      flexBasis: 'auto',
      height: '100vh',
    }}
  >
    <CircularProgress />
  </Box>
);

export default Loading;
