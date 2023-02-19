import React from 'react';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import CommonCard, { Attribute } from './CommonCard';

export function Visit() {
  return (
    <Link to='/measuring' style={{ textDecoration: 'none' }}>
      <CommonCard>
        <Box>Last updated 12 minutes ago</Box>
        <h3>Marek Ztracený</h3>
        <Grid container spacing={1}
          sx={{
            display: 'flex',
            justifyContent: 'start',
            px: [1],
          }}>
          <Attribute title='Project' text='Brain Research 01' />
          <Attribute title='Visit ID' text='5053B' />
        </Grid>
      </CommonCard>
    </Link>
  )
}