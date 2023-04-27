import React from 'react';
import { CircularProgress } from "@mui/material";
import Box from '@mui/material/Box';

interface LoadingBoxProps {
  loadingMessage: string;
}

function LoadingBox({ loadingMessage }: LoadingBoxProps) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
      <CircularProgress color="primary" thickness={4} size={80} />
      <Box padding={3}>{loadingMessage}</Box>
    </Box>);
}

export default LoadingBox;