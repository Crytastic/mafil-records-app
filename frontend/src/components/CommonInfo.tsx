import React, { useEffect, useState } from 'react';
import { Box, Badge, Divider, Grid, IconButton, Toolbar } from '@mui/material';
import { BlueButton, RedButton } from './Buttons';
import InfoItem from './InfoItem';
import { MultiLineInput } from './Inputs';
import { StudyProps } from './Study';
import { Stage } from './Stage';

interface CommonInfoProps {
  stage: Stage;
}

export function CommonInfo({ stage }: CommonInfoProps) {
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

  function renderContent() {
    if (stage === Stage.Landing) {
      return (
        <React.Fragment>
          <InfoItem label="Measuring operator" text="Not logged in" />
          <Grid
            item
            sx={{
              paddingLeft: 2,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <BlueButton text="Log in" path="/studies" />
          </Grid>
        </React.Fragment>
      );
    } else {
      const measuringOperator = <InfoItem label="Measuring operator" text="Franta Vopršálek" />;

      if (stage === Stage.Measuring) {
        return (
          <React.Fragment>
            {measuringOperator}
            <InfoItem label="Visit ID" text={props.AccessionNumber} />
            <InfoItem label="Study UID" text={props.StudyInstanceUID} />
            <InfoItem label="Patient name" text={props.PatientName} />
            <Grid
              item
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <MultiLineInput
                label="Study notes"
                name="study_notes"
                value={studyData.study_notes}
                onChange={handleTextChange}
              />
            </Grid>
            <Grid container direction="row" p={2} justifyContent="space-between">
              <BlueButton text="Finish study" path="/success" />
              <RedButton text="Back to studies" path="/studies" />
            </Grid>
            <Divider sx={{ my: 3 }} />
          </React.Fragment>
        );
      } else if (stage === Stage.Studies) {
        return (
          <React.Fragment>
            {measuringOperator}
            <Grid
              item
              sx={{
                paddingLeft: 2,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <RedButton text="Log out" path="/" />
            </Grid>
          </React.Fragment>
        )
      } else if (stage === Stage.SuccessfullVisit) {
        <React.Fragment>
          {measuringOperator}
          <Grid
            item
            sx={{
              paddingLeft: 2,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <RedButton text="Log out" path="/" />
          </Grid>
          <BlueButton text='Start visit' path='/studies' />
        </React.Fragment>
      }
    }
  }

  return <Box flexDirection="column" justifyContent="flex-start">{renderContent()}</Box>;
}