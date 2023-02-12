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
import { ThemeContext } from '@emotion/react';
import { BorderColor } from '@mui/icons-material';
import { IconButton, Badge } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import { Card } from '@mui/material';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconButtonProps } from '@material-ui/core';

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

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export function Sequence() {
  type SequenceStateEnum = 'successful' | 'failed' | 'pending';
  const [value, setValue] = useState<SequenceStateEnum>('pending');
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  function handleChange(event: SelectChangeEvent<unknown>) {
    setValue(event.target.value as SequenceStateEnum)
  }

  function handleSequenceClick() {
    setIsExpanded(!isExpanded);
  }

  function getPaperBackgroundColor() {
    switch (value) {
      case 'pending':
        return ('rgb(250, 250, 250);')
      case 'failed':
        return ('rgb(255, 230, 230);')
      case 'successful':
        return ('rgb(230, 255, 230);')
    }
  }

  function getSelectColor() {
    switch (value) {
      case 'pending':
        return ('grey')
      case 'failed':
        return ('red');
      case 'successful':
        return ('green');
    }
  }

  return (
    <Card
      sx={{
        padding: 1,
        margin: 1,
        display: 'column',
        flexDirection: 'row',
      }}
    >
      <Box>
        <Box m={1} mb={0} display={'flex'} justifyContent={'space-between'} flexDirection={'row'} flexWrap={'wrap'}>
          <Box fontWeight={'bold'} fontSize={18}>
            42 | SpinEchoFieldMap-AP
          </Box>
          <Box color={'grey'} fontWeight={'lighter'} fontSize={12}>
            <Box>Measured 1 hour ago</Box>
            <Box>Last updated 4 minutes ago</Box>
          </Box>
          <CardActions disableSpacing>
            <Box display={'flex'} justifyContent='flex-start' flexDirection={'row'}>
              <IconButton size='large'>
                <ContentCopyIcon />
              </IconButton>
              <IconButton size='large'>
                <ContentPasteIcon />
              </IconButton>
            </Box>
          </CardActions>
          <Box minWidth={140} sx={{
            background: getPaperBackgroundColor,
          }}>
            <Select fullWidth
              defaultValue={'pending'}
              value={value}
              onChange={handleChange}
              sx={{ color: getSelectColor }}
            >
              <MenuItem value={'successful'}>Successful</MenuItem>
              <MenuItem value={'failed'}>Failed</MenuItem>
              <MenuItem value={'pending'}>Pending</MenuItem>
            </Select>
          </Box>
          <CardActions disableSpacing>
            <ExpandMore
              expand={isExpanded}
              onClick={handleSequenceClick}
              aria-expanded={isExpanded}
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
        </Box>

        <Collapse in={isExpanded} timeout="auto" unmountOnExit>
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
        </Collapse>

      </Box>
    </Card >
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