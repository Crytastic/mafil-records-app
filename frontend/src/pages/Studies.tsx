import React from 'react';
import { useEffect, useState } from 'react';
import { fetchStudies } from '../components/Fetchers';
import { Study, StudyProps } from '../components/Study';
import CommonAppBar from '../components/CommonAppbar';
import { Stage } from '../components/Stage';
import CommonDrawer from '../components/CommonDrawer';
import ListItems from '../components/ListItems';

export default function Studies() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const [loading, setLoading] = useState(true);
  const [studiesJson, setStudiesJson] = useState<StudyProps[]>([]);
  const [fetchError, setFetchError] = useState<string | null>(null);

  async function fetchData() {
    setLoading(true);
    try {
      const json = await fetchStudies();
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
  }, []);

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
    <React.Fragment>
      <CommonAppBar stage={Stage.Studies} open={open} toggleDrawer={toggleDrawer} handleRefresh={handleRefresh} />
      <CommonDrawer stage={Stage.Studies} open={open} toggleDrawer={toggleDrawer} />
      <ListItems loading={loading} list={studies} errorMessage={fetchError} loadingMessage='Fetching studies for past 72 hours' />
    </React.Fragment>
  );
}
