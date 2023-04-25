import React, { useEffect, useState } from 'react';
import { Box, Badge, Divider, Grid, IconButton, Toolbar } from '@mui/material';
import { AppBar, Logo, Drawer, Message } from '../components/Components';
import { LoadingBox } from '../components/LoadingBox';
import { useTheme } from '@mui/material';

interface ListItemsProps {
  loading: boolean;
  list: JSX.Element[];
  loadingMessage: string;
  errorMessage: string | null;
}

const ListItems: React.FC<ListItemsProps> = ({ loading, list, loadingMessage, errorMessage }) => {
  const theme = useTheme();

  return (
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
      {loading ? (
        <LoadingBox loadingMessage={loadingMessage} />
      ) : errorMessage ? (
        <Message title='Error' text={errorMessage} />
      ) : (
        <Box flexDirection={'column'}>
          {list}
        </Box>
      )}
    </Box>
  );
};

export default ListItems;
