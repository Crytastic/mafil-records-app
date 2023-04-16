import React, { useEffect, useState } from 'react';
import { Box, Badge, Divider, Grid, IconButton, Toolbar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import RefreshIcon from '@mui/icons-material/Refresh';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import { AppBar, Logo, Drawer } from '../components/Components';
import { Stage } from './Stage';

interface CommonAppBarProps {
  stage: Stage;
  open: boolean;
  toggleDrawer: () => void;
  handleRefresh: () => void;
}

export default function CommonAppBar({ stage, open, toggleDrawer, handleRefresh }: CommonAppBarProps) {
  return (
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
        {stage === Stage.Measuring && (
          <Box>Measuring and taking notes</Box>
        )}
        {stage === Stage.Studies && (
          <Box>Choosing a study</Box>
        )}
        <Logo />
        <Box>
          {stage === Stage.Measuring && (
            <IconButton size="large" color="inherit">
              <Badge badgeContent={0} color="error">
                <SaveOutlinedIcon />
              </Badge>
            </IconButton>
          )}
          <IconButton size="large" color="inherit" onClick={handleRefresh}>
            <Badge badgeContent={0} color="error">
              <RefreshIcon />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
