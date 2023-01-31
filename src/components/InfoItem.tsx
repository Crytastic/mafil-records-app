import * as React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import { BlueButton, RedButton } from './Buttons';
import TextField from '@mui/material/TextField';

interface Props {
  label: string;
  text: string;
}

export default function InfoItem({ label, text }: Props) {
  return (
    <Grid item
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
      }}>
      <Box>
        {label}
      </Box>
      <Box
        sx={{
          fontWeight: 'bold'
        }}
      >
        {text}
      </Box>
    </Grid>
  )
}