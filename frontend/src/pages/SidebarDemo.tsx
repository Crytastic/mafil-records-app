import React, { useEffect, useState } from 'react';
import { fetchSeries } from '../components/Fetchers';
import { Series, SeriesProps } from '../components/Series';
import CommonAppBar from '../components/CommonAppbar';
import CommonDrawer from '../components/CommonDrawer';
import { Stage } from '../components/Stage';
import ListItems from '../components/ListItems';
import { ResizableSidebar } from '../components/ResizableSidebar';
import SidebarContext from "../components/SidebarContext";

export default function SidebarDemo() {
  const [open, setOpen] = React.useState(true);
  const [sidebarWidth, setSidebarWidth] = useState(380);
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
        setSeriesJson(json);
        setFetchError(null);
      } catch (error) {
        setFetchError('Fetching series failed, check internet connection and try again. If problem persists, contact your system administrator.');
      }
    }
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
    <SidebarContext.Provider value={{ sidebarWidth, setSidebarWidth }}>
      <React.Fragment>
        <CommonAppBar
          stage={Stage.Measuring}
          open={open}
          toggleDrawer={toggleDrawer}
          handleRefresh={handleRefresh}
        />
        <ResizableSidebar
          stage={Stage.Measuring}
          open={open}
          toggleDrawer={toggleDrawer}
        />
        <ListItems
          loading={loading}
          list={listSeries}
          errorMessage={fetchError}
          loadingMessage={`Fetching series`}
        />
      </React.Fragment>
    </SidebarContext.Provider>
  );
}
