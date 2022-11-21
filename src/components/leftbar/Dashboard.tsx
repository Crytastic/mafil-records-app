import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Info from './Info'

const drawerWidth: number = 380;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
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

const Drawer = styled(SwipeableDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
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

const Logo = () => {
  return (
    <img src='https://mafil.ceitec.cz/files/287/thumb/157-logo-mafil-transp2-0x0.png' alt="logo" height={50} />
  )
}

const mdTheme = createTheme();

interface SingleLineInputProps {
  text: string;
}

function SingleLineInput({ text }: SingleLineInputProps) {
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

function MultiLineInput() {
  return (
    <Grid item xs={8} lg={8}>
      <TextField id='outlined-multiline-static' label='Visit notes' multiline variant='outlined' rows={4} fullWidth />
    </Grid>
  )
}

interface CheckboxInputProps {
  text: string;
}

function CheckboxInput({ text }: CheckboxInputProps) {
  return (
    <FormControlLabel control={<Checkbox />} label={text} />
  )
}

function Sequence() {
  return (
    <Grid item xs={12} lg={12}>
      <Paper
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
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
          <MultiLineInput />
        </Grid>
      </Paper>
    </Grid>
  )
}

function DashboardContent() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '28px',
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Logo />
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open} onClose={toggleDrawer} onOpen={toggleDrawer}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <Info />
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 2, mb: 2 }}>
            <Grid container spacing={3} textAlign='left'>
              <Sequence />
              <Sequence />
              <Sequence />
              <Sequence />
              <Sequence />
              <Sequence />
              <Sequence />
              <Sequence />
              <Sequence />
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
