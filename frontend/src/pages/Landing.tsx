import { Box, Toolbar, useTheme } from '@mui/material';
import React, { useEffect } from 'react';
import { useAuth } from "react-oidc-context";
import { useNavigate } from "react-router-dom";
import Message from '../components/common/Message';
import CommonAppBar from '../components/global/CommonAppbar';
import { ResizableSidebar } from '../components/global/ResizableSidebar';
import { SidebarProvider } from '../contexts/SidebarContext';

function Landing() {
  const auth = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  function handleRefresh() { };

  useEffect(() => {
    if (auth && auth.user) {
      navigate('/studies');
    }
  }, [auth, navigate]);

  return (
    <SidebarProvider>
      <React.Fragment>
        <CommonAppBar
          open={open}
          toggleDrawer={toggleDrawer}
          handleRefresh={handleRefresh}
        />
        <ResizableSidebar
          open={open}
          toggleDrawer={toggleDrawer}
        />
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
          <Toolbar sx={{ minHeight: theme.mixins.toolbar.minHeight }} />
          <Message title='Log in to be able to choose a visit.' text='' />
        </Box>
      </React.Fragment >
    </SidebarProvider>
  );
}

export default Landing;
