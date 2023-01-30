import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

export interface ButtonsProps {
  text: string;
}

export function BlueButton({ text }: ButtonsProps) {
  return (
    <Grid item>
      <Button variant='contained'>{text}</Button>
    </Grid >
  )
}

export function RedButton({ text }: ButtonsProps) {
  return (
    <Grid item>
      <Button variant='outlined' color='error'>{text}</Button>
    </Grid >
  )
}