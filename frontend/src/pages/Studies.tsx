import React from 'react';
import { useEffect, useState } from 'react';
import { fetchStudies } from '../components/Fetchers';
import { Study, StudyProps } from '../components/Study';
import CommonAppBar from '../components/CommonAppbar';
import ListItems from '../components/ListItems';
import { ResizableSidebar } from '../components/ResizableSidebar';
import SidebarContext, { SidebarProvider } from '../components/SidebarContext';
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, Box } from '@mui/material';
import { formatDateToISOString } from '../components/Utils';
import { DateRangeSelector } from '../components/DateRangeSelector';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

export default function Studies() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const [loading, setLoading] = useState(true);
  const [studiesJson, setStudiesJson] = useState<StudyProps[]>([]);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState({ start: '2022-11-10T12:00:00', end: '2022-11-25T12:00:00' });

  async function fetchData() {
    setLoading(true);
    try {
      const json = await fetchStudies(dateRange);
      // Sort the studies by date, newest first
      json.sort((a: { StudyDate: Date; }, b: { StudyDate: Date; }) => new Date(b.StudyDate).getTime() - new Date(a.StudyDate).getTime());
      setStudiesJson(json);
      setFetchError(null);
    } catch (error) {
      setFetchError('Fetching studies failed, check internet connection and try again. If problem persists, contact your system administrator.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [dateRange]);

  function handleRefresh() {
    fetchData();
  };

  const studies = studiesJson.map((study) => (
    <Study
      key={study.StudyInstanceUID}
      StudyInstanceUID={study.StudyInstanceUID}
      AccessionNumber={study.AccessionNumber}
      InstitutionName={study.InstitutionName}
      NumberOfStudyRelatedSeries={study.NumberOfStudyRelatedSeries}
      PatientBirthDate={study.PatientBirthDate}
      PatientID={study.PatientID}
      PatientName={study.PatientName}
      PatientSex={study.PatientSex}
      ReferringPhysicianName={study.ReferringPhysicianName}
      StudyDate={study.StudyDate}
      StudyTime={study.StudyTime}
      StudyDescription={study.StudyDescription}
      StudyID={study.StudyID}
    />
  ));

  return (
    <SidebarProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <React.Fragment>
          <CommonAppBar
            open={open}
            toggleDrawer={toggleDrawer}
            handleRefresh={handleRefresh}
          />
          <ResizableSidebar
            open={open}
            toggleDrawer={toggleDrawer}
            content={
              <DateRangeSelector dateRange={dateRange} setDateRange={setDateRange} />
            }
          />
          <ListItems
            loading={loading}
            list={studies}
            errorMessage={fetchError}
            loadingMessage={'Fetching studies...'}
          />
        </React.Fragment>
      </LocalizationProvider>
    </SidebarProvider>
  );
}
