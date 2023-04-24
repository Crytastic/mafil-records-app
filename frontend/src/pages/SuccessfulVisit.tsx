import React from 'react';
import { Box } from '@mui/material';
import { Message } from '../components/Components';
import CommonAppBar from '../components/CommonAppbar';
import { ResizableSidebar } from '../components/ResizableSidebar';
import { SidebarProvider } from '../components/SidebarContext';
import { Stage } from '../components/Stage';

export default function SuccessfulVisit() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  function handleRefresh() { };

  return (
    <SidebarProvider>
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
    </SidebarProvider>
  );
}
