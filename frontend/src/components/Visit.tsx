import React from 'react';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import CommonCard, { ExpandMore, Attribute } from './CommonCard';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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

  return (
    <Link to='/measuring' style={{ textDecoration: 'none' }}>
      <CommonCard>
        <Box>
          <Box m={1} mb={0} display={'flex'} justifyContent={'flex-start'} flexDirection={'row'} gap={3} flexWrap={'wrap'}>

            <Box fontWeight={'bold'} fontSize={18} whiteSpace={'break-spaces'}>
              Petr Martin ({PatientName})
            </Box>

            <Attribute title='Visit ID' text={AccessionNumber} />

            <Box color={'grey'} justifyContent='flex-start' fontWeight={'lighter'} fontSize={12}>
              <Box>Study UID: {StudyInstanceUID}</Box>
              <Box>Last updated: {StudyDate.toLocaleDateString()} </Box>
            </Box>

          </Box>
        </Box>
      </CommonCard >
    </Link >
  )
}