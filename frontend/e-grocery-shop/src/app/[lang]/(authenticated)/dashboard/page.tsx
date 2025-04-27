'use client';

import { signOut } from 'next-auth/react';
import { Button, Typography } from '@mui/material';

const DashboardPage = () => (
  <>
    <Button onClick={() => signOut()}>Salir</Button>
    <Typography>DASHBOARD PAGE</Typography>
  </>
);

export default DashboardPage;
