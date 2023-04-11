import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import MenuIcon from '@mui/icons-material/Menu';
import Badge from '@mui/material/Badge';
import RefreshIcon from '@mui/icons-material/Refresh';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import InfoItem from '../components/InfoItem'
import { MultiLineInput } from '../components/Inputs'
import { AppBar, Logo, Drawer } from '../components/Components';
import { BlueButton, RedButton } from '../components/Buttons';
import { useEffect, useState } from 'react';
import { fetchSeries } from '../components/Fetchers';
import { Series, SeriesProps } from '../components/Series';
import { LoadingBox } from '../components/LoadingBox';
import AppContext from '../components/VisitContext';

function Info() {
  const { visit } = React.useContext(AppContext);
  const [visitData, setVisitData] = useState(() => {
    const localVisit = localStorage.getItem(`visit-${visit ? visit.AccessionNumber : ''}`);
    return localVisit ? JSON.parse(localVisit) : {
      visit_notes: '',
    };
  });

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setVisitData({
      ...visitData,
      [name]: value
    });
  };

  useEffect(() => {
    localStorage.setItem(`visit-${visit ? visit.AccessionNumber : ''}`, JSON.stringify({ ...visitData, visit }))
  }, [visitData]);

  return (
    <Box flexDirection='column' justifyContent='flex-start'>
      <InfoItem label='Measuring operator' text='Franta Vopršálek' />
      <InfoItem label='Visit ID' text={visit ? visit.AccessionNumber : ''} />
      <InfoItem label='Study UID' text={visit ? visit.StudyInstanceUID : ''} />
      <InfoItem label='Patient name' text={visit ? visit.PatientName : ''} />
      <Grid item
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
        }}>
        <MultiLineInput label='Visit notes' name='visit_notes' value={visitData.visit_notes} onChange={handleTextChange} />
      </Grid>
      <Grid container direction='row' p={2} justifyContent='space-between'>
        <BlueButton text='Finish visit' path='/success' />
        <RedButton text='Back to visits' path='/visits' />
      </Grid>
      <Divider sx={{ my: 3 }} />
    </Box>
  )
}

export default function Measuring() {
  const { visit } = React.useContext(AppContext);
  const [open, setOpen] = React.useState(true);
  const [seriesJson, setSeriesJson] = useState<SeriesProps[]>([]);
  const [selectedSeqId, setSelectedSeqId] = React.useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  async function fetchData() {
    setLoading(true);
    const json = await fetchSeries(localStorage.getItem('currentAccessionNumber') || (visit ? visit.AccessionNumber : ''));
    setSeriesJson(json);
    setLoading(false);
  }

  const toggleDrawer = () => {
    setOpen(!open);
  };

  useEffect(() => {
    fetchData();
  }, []);

  function handleRefresh() {
    fetchData();
  };

  const handleSeriesCopy = (seqId: string) => {
    setSelectedSeqId(seqId);
  };

  const handleSeriesPaste = () => {
    return selectedSeqId;
  };

  const listSeries = seriesJson.map((series) => (
    <Series
      key={series.SeriesInstanceUID}
      SeriesInstanceUID={series.SeriesInstanceUID}
      SequenceFileName={series.SequenceFileName}
      AcquisitionMatrix={series.AcquisitionMatrix}
      BodyPartExamined={series.BodyPartExamined}
      FlipAngle={series.FlipAngle}
      ImageType={series.ImageType}
      InversionTime={series.InversionTime}
      NumberOfSeriesRelatedInstances={series.NumberOfSeriesRelatedInstances}
      OperatorsName={series.OperatorsName}
      PAT={series.PAT}
      PatientPosition={series.PatientPosition}
      PercentPhaseFieldOfView={series.PercentPhaseFieldOfView}
      ProtocolName={series.ProtocolName}
      RepetitionTime={series.RepetitionTime}
      SOPClassUID={series.SOPClassUID}
      SeriesDescription={series.SeriesDescription}
      SeriesNumber={series.SeriesNumber}
      SeriesTime={series.SeriesTime}
      SliceThickness={series.SliceThickness}
      SoftwareVersions={series.SoftwareVersions}
      SpacingBetweenSlices={series.SpacingBetweenSlices}
      StationName={series.StationName}
      onCopy={handleSeriesCopy}
      onPaste={handleSeriesPaste}
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
          <Box>
            <IconButton
              size='large'
              color='inherit'
            >
              <Badge badgeContent={0} color="error">
                <SaveOutlinedIcon />
              </Badge>
            </IconButton>
            <IconButton
              size='large'
              color='inherit'
              onClick={handleRefresh}
            >
              <Badge badgeContent={0} color="error">
                <RefreshIcon />
              </Badge>
            </IconButton>
          </Box>
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
          <LoadingBox />
        ) : (
          <Box flexDirection={'column'}>
            {listSeries}
          </Box>
        )}
      </Box>
    </React.Fragment>
  );
}
