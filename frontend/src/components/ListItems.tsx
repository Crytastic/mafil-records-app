import React, { useEffect, useState } from 'react';
import { Box, Badge, Divider, Grid, IconButton, Toolbar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import RefreshIcon from '@mui/icons-material/Refresh';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import InfoItem from '../components/InfoItem';
import { MultiLineInput } from '../components/Inputs';
import { AppBar, Logo, Drawer, Message } from '../components/Components';
import { BlueButton, RedButton } from '../components/Buttons';
import { fetchSeries } from '../components/Fetchers';
import { Series, SeriesProps } from '../components/Series';
import { LoadingBox } from '../components/LoadingBox';
import { StudyProps } from '../components/Study';
import CommonAppBar from '../components/CommonAppbar';
import CommonDrawer from '../components/CommonDrawer';
import { Stage } from '../components/Stage';

interface ListItemsProps {
  loading: boolean;
  list: JSX.Element[];
  loadingMessage: string;
  errorMessage: string | null;
}

const ListItems: React.FC<ListItemsProps> = ({ loading, list, loadingMessage, errorMessage }) => {
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
      <Toolbar />
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
