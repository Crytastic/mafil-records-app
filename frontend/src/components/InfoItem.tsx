import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

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