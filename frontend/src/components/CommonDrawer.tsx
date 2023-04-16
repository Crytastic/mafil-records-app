import React, { useEffect, useState } from 'react';
import { Box, Badge, Divider, Grid, IconButton, Toolbar } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { AppBar, Logo, Drawer } from '../components/Components';
import { BlueButton, RedButton } from './Buttons';
import InfoItem from './InfoItem';
import { MultiLineInput } from './Inputs';
import { StudyProps } from './Study';
import { Stage } from './Stage';

interface CommonInfoProps {
  stage: Stage;
}

function CommonInfo({ stage }: CommonInfoProps) {
  const [props, setProps] = useState<StudyProps>(() => {
    const localStudy = localStorage.getItem(`currentStudy`);
    return localStudy ? JSON.parse(localStudy) : {};
  });

  const [studyData, setStudyData] = useState(() => {
    const localStudy = localStorage.getItem(`study-${props.StudyInstanceUID}`);
    return localStudy ? JSON.parse(localStudy) : {
      study_notes: '',
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
    <Box flexDirection='column' justifyContent='flex-start'>
      <InfoItem label='Measuring operator' text='Franta Vopršálek' />
      {stage === Stage.Measuring ? (
        <React.Fragment>
          <InfoItem label='Visit ID' text={props.AccessionNumber} />
          <InfoItem label='Study UID' text={props.StudyInstanceUID} />
          <InfoItem label='Patient name' text={props.PatientName} />
          <Grid item
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
            }}>
            <MultiLineInput label='Study notes' name='study_notes' value={studyData.study_notes} onChange={handleTextChange} />
          </Grid>
          <Grid container direction='row' p={2} justifyContent='space-between'>
            <BlueButton text='Finish study' path='/success' />
            <RedButton text='Back to studies' path='/studies' />
          </Grid>
          <Divider sx={{ my: 3 }} />
        </React.Fragment>
      ) :
        <Grid item
          sx={{
            paddingLeft: 2,
            display: 'flex',
            flexDirection: 'column',
          }}>
          <RedButton text='Log out' path='/' />
        </Grid>
      }
    </Box>
  )
}

interface CommonDrawerProps {
  stage: Stage;
  open: boolean;
  toggleDrawer: () => void;
}

export default function CommonDrawer({ stage, open, toggleDrawer }: CommonDrawerProps) {
  return (
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
      <CommonInfo stage={stage} />
    </Drawer>
  );
}
