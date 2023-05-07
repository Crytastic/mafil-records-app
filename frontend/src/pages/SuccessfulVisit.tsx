import { Box } from '@mui/material';
import React from 'react';
import Message from '../components/common/Message';
import CommonAppBar from '../components/global/AppBarContent';
import { ResizableSidebar } from '../components/global/ResizableSidebar';
import { SidebarProvider } from '../contexts/SidebarContext';
import { BlueButton } from '../components/common/Buttons';
import LoginButton from '../components/common/LoginButton';
import { withAuthentication } from '../utils/WithAuthentication';

function SuccessfulVisit() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <SidebarProvider>
      <React.Fragment>
        <CommonAppBar
          open={open}
          toggleDrawer={toggleDrawer}
        />
        <ResizableSidebar
          open={open}
          toggleDrawer={toggleDrawer}
          content={
            <React.Fragment>
              <LoginButton />
              <BlueButton text='Start visit' path='/studies' />
            </React.Fragment>
          }
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
    </SidebarProvider>
  );
}

const ProtectedMeasuring = withAuthentication(SuccessfulVisit);
export default ProtectedMeasuring;
