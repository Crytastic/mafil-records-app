import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Select, MenuItem, SelectChangeEvent } from '@mui/material';
import SuccessfulVisit from '../pages/SuccessfulVisit';

const drawerWidth: number = 380;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

export const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export const Drawer = styled(SwipeableDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(0),
        },
      }),
    },
  }),
);

export const Logo = () => {
  return (
    <img src='https://mafil.ceitec.cz/files/287/thumb/157-logo-mafil-transp2-0x0.png' alt="logo" height={50} />
  )
}

export const mdTheme = createTheme();

interface SingleLineInputProps {
  text: string;
}

export function SingleLineInput({ text }: SingleLineInputProps) {
  return (
    <Box m={1} minWidth={240} flexGrow={1}>
      <Box
        sx={{
          fontWeight: 'bold'
        }}
      >
        {text}
      </Box>
      <Box>
        <TextField fullWidth id='outlined-basic' label='stim_log_file.file' variant='outlined' />
      </Box>
    </Box >
  )
}

interface MultiLineInputProps {
  label: string;
}

export function MultiLineInput({ label }: MultiLineInputProps) {
  return (
    <Box m={1} minWidth={240} flexGrow={1}>
      <TextField fullWidth id='outlined-multiline-static' label={label} multiline variant='outlined' maxRows={4} />
    </Box>
  )
}

interface CheckboxInputProps {
  text: string;
}

export function CheckboxInput({ text }: CheckboxInputProps) {
  return (
    <Box>
      <FormControlLabel control={<Checkbox />} label={text} />
    </Box>
  )
}

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

export function Sequence() {
  type SequenceStateEnum = 'successful' | 'failed' | 'pending';
  const [value, setValue] = useState('pending');
  function handleChange(event: SelectChangeEvent<unknown>) {
    setValue(event.target.value as SequenceStateEnum)
  }
  function getBackgroundColor() {
    if (value == 'pending') {
      return ('rgb(250, 250, 250);')
    } else if (value == 'failed') {
      return ('rgb(255, 230, 230);')
    } else {
      return ('rgb(230, 255, 230);')
    }
  }

  return (
    <Paper
      sx={{
        padding: 1,
        margin: 1,
        display: 'column',
        flexDirection: 'row',
        background: getBackgroundColor,
      }}
    >
      <Box m={1} mb={0} display={'flex'} justifyContent={'space-between'} flexDirection={'row'} flexWrap={'wrap'}>
        <Box fontWeight={'bold'} fontSize={18}>
          42 - SpinEchoFieldMap-AP
        </Box>
        <Box color={'grey'} fontWeight={'lighter'} fontSize={12}>
          <Box>Measured 1 hour ago</Box>
          <Box>Last updated 4 minutes ago</Box>
        </Box>
        <Box minWidth={140}>
          <Select fullWidth defaultValue={'pending'} value={value} onChange={handleChange}>
            <MenuItem value={'successful'}>Successful</MenuItem>
            <MenuItem value={'failed'}>Failed</MenuItem>
            <MenuItem value={'pending'}>Pending</MenuItem>
          </Select>
        </Box>
      </Box>

      <Box display={'flex'} flexDirection={'row'} flexWrap={'wrap'}>
        <SingleLineInput text='Stim. protocol' />
        <SingleLineInput text='Stim. protocol' />
        <SingleLineInput text='Fyzio raw file' />
        <MultiLineInput label='Measurement notes' />
        <Box m={1}>
          <Box
            sx={{
              fontWeight: 'bold'
            }}
          >
            General
          </Box>
          <Box display={'flex'} flexDirection={'row'}>
            <CheckboxInput text='EEG' />
            <CheckboxInput text='ET' />
          </Box>
        </Box>
        <Box m={1}>
          <Box
            sx={{
              fontWeight: 'bold'
            }}
          >
            BP ExG
          </Box>
          <Box display={'flex'} flexDirection={'row'}>
            <CheckboxInput text='EKG' />
            <CheckboxInput text='Resp.' />
            <CheckboxInput text='GSR' />
            <CheckboxInput text='ACC' />
          </Box>
        </Box>
        <Box m={1}>
          <Box
            sx={{
              fontWeight: 'bold'
            }}
          >
            Siemens
          </Box>
          <Box display={'flex'} flexDirection={'row'}>
            <CheckboxInput text='EKG' />
            <CheckboxInput text='Resp.' />
            <CheckboxInput text='GSR' />
            <CheckboxInput text='ACC' />
          </Box>
        </Box>
      </Box>
    </Paper >
  )
}

export function Visit() {
  return (
    <Grid item xs={12} lg={12}>
      <Link to='/measuring' style={{ textDecoration: 'none' }}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
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
        </Paper>
      </Link>
    </Grid>
  )
}

interface MessageProps {
  title: string;
  text: string;
}

export function Message({ title, text }: MessageProps) {
  return (
    <Box sx={{ justifyContent: 'center', textAlign: 'center' }}>
      <h1>{title}</h1>
      <Box>{text}</Box>
    </Box>
  )
}