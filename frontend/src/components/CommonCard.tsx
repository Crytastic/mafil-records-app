import React, { ReactNode } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Card } from '@mui/material';

interface AttributeProps {
  title: string;
  text: string;
}

export function Attribute({ title, text }: AttributeProps) {
  return (
    <Grid item xs={4} lg={4}>
      <Box
        sx={{
          fontWeight: 'bold'
        }}
      >
        {title}
      </Box>
      <Box>{text}</Box>
    </Grid>
  )
}

interface AnyProps {
  children?: ReactNode
}

export default function CommonCard({ children }: AnyProps) {
  return (
    <Card
      sx={{
        padding: 1,
        margin: 1,
        display: 'column',
        flexDirection: 'row',
      }}
    >
      {children}
    </Card>
  )
}