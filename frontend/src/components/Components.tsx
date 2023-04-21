import React from 'react';
import { styled, createTheme } from '@mui/material/styles';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';

const drawerWidth: number = 380;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
  sidebarWidth: number;
}

export const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open' && prop !== 'sidebarWidth',
})<AppBarProps>(({ theme, open, sidebarWidth }) => ({
  zIndex: theme.zIndex.drawer + 1,
  ...(open && {
    marginLeft: sidebarWidth,
    width: `calc(100% - ${sidebarWidth}px)`,
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
        width: theme.spacing(0),
      }),
    },
  }),
);

export const Logo = () => {
  return (
    <img src='https://mafil.ceitec.cz/files/287/thumb/157-logo-mafil-transp2-0x0.png' alt="logo" height={45} />
  )
}

export const mdTheme = createTheme();

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