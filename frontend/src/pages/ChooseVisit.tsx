import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import MenuIcon from '@mui/icons-material/Menu';
import Badge from '@mui/material/Badge';
import RefreshIcon from '@mui/icons-material/Refresh';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import InfoItem from '../components/InfoItem'
import { AppBar, Logo, Drawer } from '../components/Components';
import { Visit, VisitProps } from '../components/Visit';
import { BlueButton, RedButton } from '../components/Buttons';
import { useEffect, useState } from 'react';
import { fetchVisits } from '../components/Fetchers';
import { LoadingBox } from '../components/LoadingBox';

function Info() {
  return (
    <Grid container direction='column' justifyContent='flex-start'>
      <InfoItem label='Measuring operator' text='Franta Vopršálek' />
      <Grid item
        sx={{
          paddingLeft: 2,
          display: 'flex',
          flexDirection: 'column',
        }}>
        <RedButton text='Log out' path='/' />
      </Grid>
    </Grid>
  )
}

export default function ChooseVisit() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const [loading, setLoading] = useState(true);
  const [visitsJson, setVisitsJson] = useState<VisitProps[]>([]);

  async function fetchData() {
    setLoading(true);
    const json = await fetchVisits();
    // Sort the visits by date, newest first
    json.sort((a: { StudyDate: Date; }, b: { StudyDate: Date; }) => new Date(b.StudyDate).getTime() - new Date(a.StudyDate).getTime());
    setVisitsJson(json);
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  function handleRefresh() {
    fetchData();
  };

  const visits = visitsJson.map((visit) => (
    <Visit
      key={visit.StudyInstanceUID}
      StudyInstanceUID={visit.StudyInstanceUID}
      AccessionNumber={visit.AccessionNumber}
      InstitutionName={visit.InstitutionName}
      NumberOfStudyRelatedSeries={visit.NumberOfStudyRelatedSeries}
      PatientBirthDate={visit.PatientBirthDate}
      PatientID={visit.PatientID}
      PatientName={visit.PatientName}
      PatientSex={visit.PatientSex}
      ReferringPhysicianName={visit.ReferringPhysicianName}
      StudyDate={visit.StudyDate}
      StudyTime={visit.StudyTime}
      StudyDescription={visit.StudyDescription}
      StudyID={visit.StudyID}
    />
  ));

  return (
    <React.Fragment>
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
          <Logo />
          <IconButton
            size='large'
            color='inherit'
            onClick={handleRefresh}
          >
            <Badge badgeContent={0} color="error">
              <RefreshIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open} onClose={toggleDrawer} onOpen={toggleDrawer}>
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            px: [1],
          }}
        >
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <Info />
      </Drawer>
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
        <Toolbar />
        {loading ? (
          <LoadingBox />
        ) : (
          visits
        )}
      </Box>
    </React.Fragment>
  );
}
