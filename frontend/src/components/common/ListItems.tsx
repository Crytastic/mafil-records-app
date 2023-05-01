import { Box, Toolbar, useTheme } from '@mui/material';
import React from 'react';

import LoadingBox from './LoadingBox';
import Message from './Message';

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
        overflow: 'auto',
        height: '100vh',
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
