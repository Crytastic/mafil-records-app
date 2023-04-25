import { Box, Badge, Divider, Grid, IconButton, Toolbar, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import RefreshIcon from '@mui/icons-material/Refresh';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { AppBar, Logo, Drawer } from '../components/Components';
import SidebarContext from "./SidebarContext";
import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface CommonAppBarProps {
  open: boolean;
  toggleDrawer: () => void;
  handleRefresh: () => void;
  sortOrder?: 'asc' | 'desc';
  toggleSortOrder?: () => void;
}

export default function CommonAppBar({ open, sortOrder, toggleSortOrder, toggleDrawer, handleRefresh }: CommonAppBarProps) {
  const currentPath = useLocation().pathname;
  const { sidebarWidth } = useContext(SidebarContext);
  const [showLogo, setShowLogo] = useState(true);
  const [showTitle, setShowTitle] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      const rightSectionWidth = windowWidth - sidebarWidth;
      sidebarWidth / windowWidth <= 0.5 ? setShowLogo(true) : setShowLogo(false);
      sidebarWidth / windowWidth <= 0.7 ? setShowTitle(true) : setShowTitle(false);
      if (open && rightSectionWidth < 600) {
        setShowLogo(false);
        setShowTitle(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [sidebarWidth]);

  return (
    <AppBar position="absolute" sidebarWidth={sidebarWidth} open={open}>
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
        {showTitle ?
          <React.Fragment>
            {currentPath === "/measuring" && (
              <Box>Measuring and taking notes</Box>
            )}
            {currentPath === "/studies" && (
              <Box>Choosing a study</Box>
            )}
          </React.Fragment>
          : <Box />}
        {showLogo && <Logo />}
        <Box>
          {currentPath === "/measuring" && (
            <React.Fragment>
              <IconButton size="large" color="inherit" onClick={toggleSortOrder}>
                {sortOrder === 'asc' ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
              </IconButton>
              <IconButton size="large" color="inherit">
                <Badge badgeContent={0} color="error">
                  <SaveOutlinedIcon />
                </Badge>
              </IconButton>
            </React.Fragment>
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
