import React, { useState } from 'react';
import { Box, Divider, Grid, Toolbar } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Badge from '@mui/material/Badge';
import RefreshIcon from '@mui/icons-material/Refresh';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import InfoItem from '../components/InfoItem'
import { AppBar, Logo, Drawer, Message } from '../components/Components';
import { BlueButton, RedButton } from '../components/Buttons';
import CommonAppBar from '../components/CommonAppbar';
import { ResizableSidebar } from '../components/ResizableSidebar';
import SidebarContext from '../components/SidebarContext';
import { Stage } from '../components/Stage';

function Info() {
  return (
    <Grid container direction='column' justifyContent='flex-start'>
      <InfoItem label='Measuring operator' text='Franta Vopršálek' />
      <Grid item
        sx={{
          paddingLeft: 2,
          display: 'flex',
          flexDirection: 'column',
        }}>
        <RedButton text='Log out' path='/' />
      </Grid>
      <InfoItem label='Visit ID' text='Not selected yet' />
      <Grid item
        sx={{
          paddingLeft: 2,
          display: 'flex',
          flexDirection: 'column',
        }}>
        <BlueButton text='Start visit' path='/studies' />
      </Grid>
      <InfoItem label='Project / version' text='Not selected yet' />
    </Grid>
  )
}

export default function SuccessfulVisit() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const [sidebarWidth, setSidebarWidth] = useState(380);
  function handleRefresh() { };

  return (
    <SidebarContext.Provider value={{ sidebarWidth, setSidebarWidth }}>
      <React.Fragment>
        <CommonAppBar
          stage={Stage.Landing}
          open={open}
          toggleDrawer={toggleDrawer}
          handleRefresh={handleRefresh}
        />
        <ResizableSidebar
          stage={Stage.Landing}
          open={open}
          toggleDrawer={toggleDrawer}
        />
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
          <Message title='Visit successful' text='Visit has been successfully saved to the database. You may log out or choose another visit.' />
        </Box>
      </React.Fragment >
    </SidebarContext.Provider>
  );
}
