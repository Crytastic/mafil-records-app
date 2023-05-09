import RefreshIcon from '@mui/icons-material/Refresh';
import { Badge, IconButton, Tooltip } from '@mui/material';
import React from 'react';

interface RefreshButtonProps {
  onClick?: () => void;
  tooltipTitle: string;
}

function RefreshButton({ onClick, tooltipTitle }: RefreshButtonProps) {
  return (
    <Tooltip title={tooltipTitle}>
      <IconButton size="large" color="inherit" onClick={onClick}>
        <Badge badgeContent={0} color="error">
          <RefreshIcon />
        </Badge>
      </IconButton>
    </Tooltip>
  )
}

export default RefreshButton;