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

  function renderContent() {
    if (stage === Stage.Landing) {
      return (
        <React.Fragment>
          <InfoItem label="Measuring operator" text="Not logged in" />
          <Box>
            <BlueButton text="Log in" path="/studies" />
          </Box>
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
        );
      } else if (stage === Stage.Studies) {
        return (
          <React.Fragment>
            {measuringOperator}
            <Box>
              <RedButton text="Log out" path="/" />
            </Box>
          </React.Fragment>
        )
      } else if (stage === Stage.SuccessfullVisit) {
        <React.Fragment>
          {measuringOperator}
          <Box>
            <RedButton text="Log out" path="/" />
          </Box>
          <BlueButton text='Start visit' path='/studies' />
        </React.Fragment>
      }
    }
  }

  return <Box
    gap={2}
    p={2}
    display="flex"
    flexDirection="column"
    justifyContent="flex-start"
  >
    {renderContent()}
  </Box >;
}