import { Box, Divider } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useAuth } from 'react-oidc-context';
import RefreshButton from '../components/common/AppBarButton';
import { BlueButton, RedButton } from '../components/common/Buttons';
import InfoItem from '../components/common/InfoItem';
import { MultiLineInput } from '../components/common/Inputs';
import ListItems from '../components/common/ListItems';
import SaveButton from '../components/common/SaveButton';
import SortButton from '../components/common/SortButton';
import CommonAppBar from '../components/global/AppBarContent';
import { ResizableSidebar } from '../components/global/ResizableSidebar';
import { Series, SeriesData, SeriesProps } from '../components/series/Series';
import { StudyProps } from '../components/studies/Study';
import { SidebarProvider } from '../contexts/SidebarContext';
import { fetchSeries } from '../utils/Fetchers';
import { withAuthentication } from '../utils/WithAuthentication';

function Measuring() {
  const auth = useAuth();
  const [open, setOpen] = React.useState(true);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [seriesJson, setSeriesJson] = useState<SeriesProps[]>([]);
  const [selectedSeqId, setSelectedSeqId] = React.useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [savingSeries, setSavingSeries] = useState<boolean>(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  async function saveSeries() {
    setSavingSeries(true);

    try {
      const seriesKeys = Object.keys(localStorage).filter((key) => key.startsWith('series-'));
      const seriesDataArray = seriesKeys.map((key) => JSON.parse(localStorage.getItem(key) || '{}'));
      console.log(seriesDataArray);

      const response = await fetch('/api/series', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(seriesDataArray),
      });

      if (response.ok) {
        console.log('Series data saved to the database');
      } else {
        console.error('Failed to save series data to the database');
      }
    } catch (error) {
      console.error('Error saving series data:', error);
    }

    setSavingSeries(false);
  }

  async function fetchData() {
    setLoading(true);
    const currentStudyString = localStorage.getItem('currentStudy');
    if (currentStudyString) {
      try {
        const currentStudy = JSON.parse(currentStudyString);
        const json = await fetchSeries(currentStudy.AccessionNumber);
        // Sort the series by series number, highest (newly added) first
        json.sort((a: SeriesProps, b: SeriesProps) => a.SeriesNumber - b.SeriesNumber);
        setFetchError(null);
        setSeriesJson(json);
      } catch (error) {
        setFetchError('Fetching series failed, check internet connection and try again. If problem persists, contact your system administrator.');
      }
    }
    setLoading(false);
  }

  const toggleDrawer = () => {
    setOpen(!open);
  };

  function toggleSortOrder() {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newSortOrder);

    const sortedData = [...seriesJson];
    if (newSortOrder === 'asc') {
      sortedData.sort((a: SeriesProps, b: SeriesProps) => a.SeriesNumber - b.SeriesNumber);
    } else {
      sortedData.sort((a: SeriesProps, b: SeriesProps) => b.SeriesNumber - a.SeriesNumber);
    }
    setSeriesJson(sortedData);
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

  function listSeries() {
    return seriesJson.map((series) => (
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
  }

  const [props, setProps] = useState<StudyProps>(() => {
    const localStudy = localStorage.getItem(`currentStudy`);
    return localStudy ? JSON.parse(localStudy) : {};
  });

  const [studyData, setStudyData] = useState(() => {
    const localStudy = localStorage.getItem(`study-${props.StudyInstanceUID}`);
    return localStudy ? JSON.parse(localStudy) : {
      general_comment: '',
    };
  });

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setStudyData({
      ...studyData,
      [name]: value,
    });
  };

  useEffect(() => {
    localStorage.setItem(`study-${props.StudyInstanceUID}`, JSON.stringify({ ...studyData }))
  }, [studyData]);

  return (
    <SidebarProvider>
      <React.Fragment>
        <CommonAppBar
          open={open}
          toggleDrawer={toggleDrawer}
          pageTitle='Measuring and taking notes'
          content={
            <React.Fragment>
              <SortButton sortOrder={sortOrder} onClick={toggleSortOrder} />
              <SaveButton savingSeries={savingSeries} onClick={saveSeries} />
              <RefreshButton onClick={handleRefresh} />
            </React.Fragment>
          }
        />
        <ResizableSidebar
          open={open}
          toggleDrawer={toggleDrawer}
          content={
            <React.Fragment>
              <InfoItem label="Measuring operator" text={auth.user ? auth.user.profile.name : ''} />
              <InfoItem label="Visit ID" text={props.AccessionNumber} />
              <InfoItem label="Study UID" text={props.StudyInstanceUID} />
              <InfoItem label="Patient name" text={props.PatientName} />
              <MultiLineInput
                label="General comment to visit"
                name="general_comment"
                value={studyData.general_comment}
                onChange={handleTextChange}
              />
              <Box gap={2} display='flex' flexDirection="row" flexWrap='wrap' justifyContent="space-between">
                <BlueButton text="Finish study" path="/success" />
                <RedButton text="Back to studies" path="/studies" />
              </Box>
              <Divider sx={{ my: 3 }} />
            </React.Fragment>
          }
        />
        <ListItems
          loading={loading}
          list={listSeries()}
          errorMessage={fetchError}
          loadingMessage={`Fetching series...`}
        />
      </React.Fragment>
    </SidebarProvider >
  );
}

const ProtectedMeasuring = withAuthentication(Measuring);
export default ProtectedMeasuring;
