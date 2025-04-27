import { Box, CircularProgress } from '@mui/material';

export default function Loading() {
  return (
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
}
