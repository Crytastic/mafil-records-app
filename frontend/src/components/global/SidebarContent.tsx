import { Box } from '@mui/material';
import React from 'react';

interface SidebarContentProps {
  content?: React.ReactNode;
}

export function SidebarContent({ content }: SidebarContentProps) {
  return <Box
    gap={2}
    p={2}
    display="flex"
    flexDirection="column"
    justifyContent="flex-start"
  >
    {content}
  </Box >;
}