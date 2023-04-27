import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import React, { useEffect, useState } from 'react';
import ListItems from '../components/common/ListItems';
import CommonAppBar from '../components/global/CommonAppbar';
import { ResizableSidebar } from '../components/global/ResizableSidebar';
import { DateRangeSelector, formatDateToISOString } from '../components/studies/DateRangeSelector';
import { Study, StudyProps } from '../components/studies/Study';
import { SidebarProvider } from '../contexts/SidebarContext';
import { fetchStudies } from '../utils/Fetchers';

function Studies() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const [loading, setLoading] = useState(true);
  const [studiesJson, setStudiesJson] = useState<StudyProps[]>([]);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const endDate = new Date();
  const startDate = new Date(endDate);
  startDate.setHours(endDate.getHours() - 72);
  const [dateRange, setDateRange] = useState({
    start: formatDateToISOString(startDate),
    end: formatDateToISOString(endDate),
  });

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

export default Studies;
