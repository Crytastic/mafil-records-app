import React, { useContext } from 'react';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import CommonCard, { Attribute } from './CommonCard';
import AppContext from './VisitContext';

export interface VisitProps {
  StudyInstanceUID: string;
  AccessionNumber: string;
  InstitutionName: string;
  NumberOfStudyRelatedSeries: number | null;
  PatientBirthDate: string;
  PatientID: string;
  PatientName: string;
  PatientSex: string;
  ReferringPhysicianName: string;
  StudyDate: Date;
  StudyTime: string;
  StudyDescription: string;
  StudyID: string;
}

export function Visit(props: VisitProps) {
  const {
    StudyInstanceUID,
    AccessionNumber,
    InstitutionName,
    NumberOfStudyRelatedSeries,
    PatientBirthDate,
    PatientID,
    PatientName,
    PatientSex,
    ReferringPhysicianName,
    StudyDate,
    StudyTime,
    StudyDescription,
    StudyID,
  } = props;

  const { setVisit } = useContext(AppContext);

  const handleClick = () => {
    setVisit(props);
    localStorage.setItem('currentAccessionNumber', AccessionNumber);
  };

  return (
    <Link to='/measuring' style={{ textDecoration: 'none' }} onClick={handleClick}>
      <CommonCard>
        <Box>
          <Box m={1} mb={0} display={'flex'} justifyContent={'flex-start'} flexDirection={'row'} gap={3} flexWrap={'wrap'}>

            <Attribute title='Name of patient' text={PatientName} />
            <Attribute title='Visit ID' text={AccessionNumber} />

            <Box color={'grey'} justifyContent='flex-start' fontWeight={'lighter'} fontSize={12}>
              <Box>Date of visit: {StudyDate.toLocaleDateString()}</Box>
              <Box>Last updated: {StudyDate.toLocaleDateString()} 12:00 </Box>
            </Box>

            <Box color={'grey'} justifyContent='flex-start' fontWeight={'lighter'} fontSize={12}>
              <Box>Study UID: {StudyInstanceUID}</Box>
              <Box>Study date: {StudyDate.toLocaleDateString()} 12:00</Box>
            </Box>

          </Box>
        </Box>
      </CommonCard >
    </Link >
  )
}