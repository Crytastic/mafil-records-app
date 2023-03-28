import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import MenuIcon from '@mui/icons-material/Menu';
import Badge from '@mui/material/Badge';
import RefreshIcon from '@mui/icons-material/Refresh';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import InfoItem from '../components/InfoItem'
import { AppBar, mdTheme, Logo, Drawer } from '../components/Components';
import { Sequence } from '../components/Sequence';
import { TextField } from '@material-ui/core';
import { BlueButton, RedButton } from '../components/Buttons';
import { useEffect } from 'react';

function Info() {
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
        <TextField id='outlined-multiline-static' label='Visit notes' multiline variant='outlined' maxRows={12} />
      </Grid>
      <Grid container direction='row' p={2} justifyContent='space-between'>
        <BlueButton text='Finish visit' path='/success' />
        <RedButton text='Abort visit' path='/abort' />
      </Grid>
      <Divider sx={{ my: 3 }} />
    </Grid>
  )
}

export async function GetSequences() {
  try {
    const resp = await fetch(`http://localhost:8000/sequences`)
    const seqsJson = await resp.json();
    return seqsJson;
  } catch (err) {
    console.error(err)
    return [];
  }
}

export default function Measuring() {
  const [open, setOpen] = React.useState(true);
  const [sequences, setSequences] = React.useState<any[]>([]);
  const [selectedSeqId, setSelectedSeqId] = React.useState<string | null>(null);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  useEffect(() => {
    GetSequences().then((seqs) => {
      setSequences(seqs);
    });
  }, []);

  const handleSequenceCopy = (seqId: string) => {
    setSelectedSeqId(seqId);
  };

  const handleSequencePaste = () => {
    return selectedSeqId;
  };

  const listSequences = sequences.map((sequence) => (
    <Sequence key={sequence.id} seq={sequence} onCopy={handleSequenceCopy} onPaste={handleSequencePaste} />
  ));

  return (
    <React.Fragment>
      <AppBar position="absolute" open={open}>
        <Toolbar
          sx={{
            pr: '28px',
            justifyContent: 'space-between',
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
          <Box>
            <IconButton
              size='large'
              color='inherit'
            >
              <Badge badgeContent={0} color="error">
                <SaveOutlinedIcon />
              </Badge>
            </IconButton>
            <IconButton
              size='large'
              color='inherit'
            >
              <Badge badgeContent={0} color="error">
                <RefreshIcon />
              </Badge>
            </IconButton>
          </Box>
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
          backgroundColor: (theme: any) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Toolbar />
        <Box>Selected seq id: {selectedSeqId}</Box>
        <Box flexDirection={'column'}>
          {listSequences}
        </Box>
      </Box>
    </React.Fragment>
  );
}
