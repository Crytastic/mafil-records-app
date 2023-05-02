import RefreshIcon from '@mui/icons-material/Refresh';
import { Badge, IconButton } from '@mui/material';
import React from 'react';

interface RefreshButtonProps {
  onClick?: () => void;
}

function RefreshButton({ onClick }: RefreshButtonProps) {
  return (
    <IconButton size="large" color="inherit" onClick={onClick}>
      <Badge badgeContent={0} color="error">
        <RefreshIcon />
      </Badge>
    </IconButton>
  )
}

export default RefreshButton;