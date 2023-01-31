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
    <Grid item xs={4} lg={4}>
      <Box
        sx={{
          fontWeight: 'bold'
        }}
      >
        {text}
      </Box>
      <TextField id='outlined-basic' label='stim_log_file.file' variant='outlined' />
    </Grid>
  )
}

interface MultiLineInputProps {
  label: string;
}

export function MultiLineInput({ label }: MultiLineInputProps) {
  return (
    <Grid item xs={8} lg={8}>
      <TextField id='outlined-multiline-static' label={label} multiline variant='outlined' rows={4} fullWidth />
    </Grid>
  )
}

interface CheckboxInputProps {
  text: string;
}

export function CheckboxInput({ text }: CheckboxInputProps) {
  return (
    <FormControlLabel control={<Checkbox />} label={text} />
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
  return (
    <Grid item xs={12} lg={12}>
      <Paper
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box>Last changed 5 hours ago</Box>
        <h3>SpinEchoFieldMap-AP</h3>
        <Grid container spacing={1}
          sx={{
            display: 'flex',
            justifyContent: 'start',
            px: [1],
          }}>
          <SingleLineInput text='Stim. protocol' />
          <SingleLineInput text='Stim. protocol' />
          <SingleLineInput text='Fyzio raw file' />
          <Grid item xs={4} lg={4}>
            <Box
              sx={{
                fontWeight: 'bold'
              }}
            >
              General
            </Box>
            <CheckboxInput text='EEG' />
            <CheckboxInput text='ET' />
          </Grid>
          <Grid item xs={4} lg={4}>
            <Box
              sx={{
                fontWeight: 'bold'
              }}
            >
              BP ExG
            </Box>
            <CheckboxInput text='EKG' />
            <CheckboxInput text='Resp.' />
            <CheckboxInput text='GSR' />
            <CheckboxInput text='ACC' />
          </Grid>
          <Grid item xs={4} lg={4}>
            <Box
              sx={{
                fontWeight: 'bold'
              }}
            >
              Siemens
            </Box>
            <CheckboxInput text='EKG' />
            <CheckboxInput text='Resp.' />
            <CheckboxInput text='GSR' />
            <CheckboxInput text='ACC' />
          </Grid>
          <MultiLineInput label='Measurement notes' />
        </Grid>
      </Paper>
    </Grid>
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