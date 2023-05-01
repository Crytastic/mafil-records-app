import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { IconButton } from '@mui/material';
import React from 'react';

interface SortButtonProps {
  sortOrder?: 'asc' | 'desc';
  onClick?: () => void;
}

function SortButton({ sortOrder, onClick }: SortButtonProps) {
  return (
    <IconButton size="large" color="inherit" onClick={onClick}>
      {sortOrder === 'asc' ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
    </IconButton>
  )
}

export default SortButton;