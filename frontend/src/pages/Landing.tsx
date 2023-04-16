import React from 'react';
import { Box, Divider, Grid, IconButton, Toolbar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import InfoItem from '../components/InfoItem';
import { AppBar, Drawer, Logo, Message } from '../components/Components';
import { BlueButton } from '../components/Buttons';

function Info() {
  return (
    <Grid container direction='column' justifyContent='flex-start'>
      <InfoItem label='Measuring operator' text='Not logged in' />
      <Grid item
        sx={{
          paddingLeft: 2,
          display: 'flex',
          flexDirection: 'column',
        }}>
        <BlueButton text='Log in' path='/studies' />
      </Grid>
    </Grid>
  )
}

export default function Home() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

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
          <IconButton
            size='large'
            color='inherit'
          >
          </IconButton>
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
        <Message title='Log in to be able to choose a visit.' text='' />
      </Box>
    </React.Fragment >
  );
}
