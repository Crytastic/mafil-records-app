import React from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { Box } from '@mui/material';

export interface ButtonsProps {
  text: string;
  path: string;
}

export function BlueButton({ text, path }: ButtonsProps) {
  return (
    <Box>
      <Link to={path} style={{ textDecoration: 'none' }}>
        <Button variant='contained' >
          {text}
        </Button>
      </Link>
    </Box >
  )
}

export function RedButton({ text, path }: ButtonsProps) {
  return (
    <Box>
      <Link to={path} style={{ textDecoration: 'none' }}>
        <Button variant='outlined' color='error'>
          {text}
        </Button>
      </Link>
    </Box >
  )
}