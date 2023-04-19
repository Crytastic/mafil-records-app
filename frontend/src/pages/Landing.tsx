import React, { useState } from 'react';
import { Box, Divider, Grid, IconButton, Toolbar } from '@mui/material';
import { AppBar, Drawer, Logo, Message } from '../components/Components';
import CommonAppBar from '../components/CommonAppbar';
import { ResizableSidebar } from '../components/ResizableSidebar';
import { Stage } from '../components/Stage';
import SidebarContext from '../components/SidebarContext';
import { useAuth } from "react-oidc-context";

export default function Home() {
  const auth = useAuth();
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  function handleRefresh() { };
  const [sidebarWidth, setSidebarWidth] = useState(380);

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
          <Message title='Log in to be able to choose a visit.' text='' />
        </Box>
      </React.Fragment >
    </SidebarContext.Provider>
  );
}
