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

function InfoItem({ label, text }: Props) {
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

export default function Info() {
  return (
    <Grid container direction='column' justifyContent='flex-start'>
      <InfoItem label='Measuring operator' text='Franta Vopršálek' />
      <InfoItem label='Visit ID' text='5053B' />
      <InfoItem label='Study UID' text='1.3.6.2.5050.50505.50505.684832' />
      <InfoItem label='Project / version' text='Brain research 01' />
      <Grid item
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
        }}>
        <TextField id='outlined-multiline-static' label='Visit notes' multiline variant='outlined' rows={4} />
      </Grid>
      <Grid container direction='row' p={2} justifyContent='space-between'>
        <BlueButton text='Finish visit' />
        <RedButton text='Abort visit' />
      </Grid>
      <Divider sx={{ my: 3 }} />
      <Grid container direction='row' p={2} justifyContent='space-between'>
        <BlueButton text='Prefill selected' />
        <RedButton text='Clear prefill' />
      </Grid>
    </Grid>
  )
}