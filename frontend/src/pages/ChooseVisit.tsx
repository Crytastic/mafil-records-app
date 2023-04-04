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
import { CircularProgress } from '@material-ui/core';
import { AppBar, mdTheme, Logo, Drawer } from '../components/Components';
import { Visit, VisitProps } from '../components/Visit';
import { TextField } from '@material-ui/core';
import { BlueButton, RedButton } from '../components/Buttons';
import { useEffect, useState } from 'react';

const fetch = require('node-fetch');
const https = require('https');

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
      <InfoItem label='Visit ID' text='Not selected yet' />
      <InfoItem label='Project / version' text='Not selected yet' />
    </Grid>
  )
}

export async function fetchVisits() {
  const url = 'http://devel.mafildb.ics.muni.cz:8000/json?start=2022-11-10T12:00:00&end=2022-11-25T12:00:00&level=STUDY&force_pacs';

  try {
    const resp = await fetch(
      url,
      {
        method: 'GET',
        withCredentials: true,
        headers: {
          'Authorization': 'Token c07d70fd9f56bc470a83c28bcd0a4718ff198570'
        },
        mode: 'cors',
      });
    const json = await resp.json();
    // console.log("FETCH VISITS OK");
    const parsedVisits = json.map((visit: any) => {
      const parsedDate = new Date(visit.StudyDate.substr(0, 4), parseInt(visit.StudyDate.substr(4, 2)) - 1, visit.StudyDate.substr(6, 2));
      return { ...visit, StudyDate: parsedDate };
    });
    return parsedVisits;
  } catch (err) {
    console.error(err)
    // console.log("FETCH VISITS FAILED");
    return [];
  }
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
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
            <CircularProgress color="primary" thickness={4} size={80} />
          </Box>
        ) : (
          visits
        )}
      </Box>
    </React.Fragment>
  );
}
