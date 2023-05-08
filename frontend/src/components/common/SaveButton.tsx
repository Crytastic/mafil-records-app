import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import { Badge, CircularProgress, IconButton } from '@mui/material';
import React from 'react';

interface SaveButtonProps {
  savingSeries: boolean;
  onClick?: () => void;
}

function SaveButton({ savingSeries, onClick }: SaveButtonProps) {
  return (
    <IconButton size="large" color="inherit" onClick={onClick}>
      {savingSeries ? (
        <CircularProgress color="inherit" size={24} thickness={6} />
      ) : (
        <SaveOutlinedIcon />
      )}
    </IconButton>
  )
}

export default SaveButton;