import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import { Badge, IconButton } from '@mui/material';
import React from 'react';

interface SaveButtonProps {
  onClick?: () => void;
}

function SaveButton({ onClick }: SaveButtonProps) {
  return (
    <IconButton size="large" color="inherit">
      <SaveOutlinedIcon />
    </IconButton>
  )
}

export default SaveButton;