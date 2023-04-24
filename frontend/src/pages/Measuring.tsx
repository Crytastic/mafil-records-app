import React, { useEffect, useState } from 'react';
import { fetchSeries } from '../components/Fetchers';
import { Series, SeriesProps } from '../components/Series';
import CommonAppBar from '../components/CommonAppbar';
import { Stage } from '../components/Stage';
import ListItems from '../components/ListItems';
import { ResizableSidebar } from '../components/ResizableSidebar';
import SidebarContext from '../components/SidebarContext';
import { SidebarProvider } from '../components/SidebarContext';

export default function Measuring() {
  const [open, setOpen] = React.useState(true);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [seriesJson, setSeriesJson] = useState<SeriesProps[]>([]);
  const [selectedSeqId, setSelectedSeqId] = React.useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

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

  return (
    <SidebarProvider>
      <React.Fragment>
        <CommonAppBar
          stage={Stage.Measuring}
          open={open}
          sortOrder={sortOrder}
          toggleDrawer={toggleDrawer}
          toggleSortOrder={toggleSortOrder}
          handleRefresh={handleRefresh}
        />
        <ResizableSidebar
          stage={Stage.Measuring}
          open={open}
          toggleDrawer={toggleDrawer}
        />
        <ListItems
          loading={loading}
          list={listSeries()}
          errorMessage={fetchError}
          loadingMessage={`Fetching series`}
        />
      </React.Fragment>
    </SidebarProvider >
  );
}
