import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useState } from 'react';
import { Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { IconButton } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { IconButtonProps } from '@material-ui/core';
import CommonCard, { Attribute } from './CommonCard';

interface SingleLineInputProps {
  text: string;
}

export function SingleLineInput({ text }: SingleLineInputProps) {
  return (
    <Box m={1} minWidth={240} flexGrow={1}>
      <Box
        sx={{
          fontWeight: 'bold'
        }}
      >
        {text}
      </Box>
      <Box>
        <TextField fullWidth id='outlined-basic' label='stim_log_file.file' variant='outlined' />
      </Box>
    </Box >
  )
}

interface MultiLineInputProps {
  label: string;
}

export function MultiLineInput({ label }: MultiLineInputProps) {
  return (
    <Box m={1} minWidth={240} flexGrow={1}>
      <TextField fullWidth id='outlined-multiline-static' label={label} multiline variant='outlined' maxRows={4} />
    </Box>
  )
}

interface CheckboxInputProps {
  text: string;
}

export function CheckboxInput({ text }: CheckboxInputProps) {
  return (
    <Box>
      <FormControlLabel control={<Checkbox />} label={text} />
    </Box>
  )
}

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export function Sequence({ seq }: any) {
  type SequenceStateEnum = 'successful' | 'failed' | 'pending';

  const [sequenceData, setSequenceData] = useState(() => {
    const localSeq = localStorage.getItem(`sequence-${seq.id}`);
    return localSeq ? JSON.parse(localSeq) : {
      seq_state: 'pending',
      is_expanded: false,
      measured: '',
      last_updated: '',
      expanded: '',
      measurement_notes: '',
      stim_log_file: '',
      fyzio_raw_file: '',
      general_eeg: '',
      general_et: '',
      bp_ekg: '',
      bp_resp: '',
      bp_gsr: '',
      bp_acc: '',
      siemens_ekg: '',
      siemens_resp: '',
      siemens_gsr: '',
      siemens_acc: '',
    };
  });

  useEffect(() => {
    localStorage.setItem(`sequence-${seq.id}`, JSON.stringify(sequenceData))
  }, [sequenceData]);

  function handleSeqStateChange(event: SelectChangeEvent<unknown>) {
    setSequenceData({
      ...sequenceData,
      seq_state: event.target.value as SequenceStateEnum
    });
  }

  function handleSequenceClick() {
    setSequenceData({
      ...sequenceData,
      is_expanded: !sequenceData.is_expanded
    });
  }

  function getPaperBackgroundColor() {
    switch (sequenceData.seq_state) {
      case 'pending':
        return ('rgb(250, 250, 250);')
      case 'failed':
        return ('rgb(255, 230, 230);')
      case 'successful':
        return ('rgb(230, 255, 230);')
    }
  }

  function getSelectColor() {
    switch (sequenceData.seq_state) {
      case 'pending':
        return ('grey')
      case 'failed':
        return ('red');
      case 'successful':
        return ('green');
    }
  }

  return (
    <CommonCard>
      <Box>
        <Box m={1} mb={0} display={'flex'} justifyContent={'space-between'} flexDirection={'row'} flexWrap={'wrap'}>
          <Box fontWeight={'bold'} fontSize={18}>
            {seq.id} | {seq.title}
          </Box>
          <Box color={'grey'} fontWeight={'lighter'} fontSize={12}>
            <Box>Measured 1 hour ago</Box>
            <Box>Last updated 4 minutes ago</Box>
          </Box>
          <CardActions disableSpacing>
            <Box display={'flex'} justifyContent='flex-start' flexDirection={'row'}>
              <IconButton size='large'>
                <ContentCopyIcon />
              </IconButton>
              <IconButton size='large'>
                <ContentPasteIcon />
              </IconButton>
            </Box>
          </CardActions>
          <Box minWidth={140} sx={{
            background: getPaperBackgroundColor,
          }}>
            <Select fullWidth
              defaultValue={'pending'}
              value={sequenceData.seq_state}
              onChange={handleSeqStateChange}
              sx={{ color: getSelectColor }}
            >
              <MenuItem value={'successful'}>Successful</MenuItem>
              <MenuItem value={'failed'}>Failed</MenuItem>
              <MenuItem value={'pending'}>Pending</MenuItem>
            </Select>
          </Box>
          <CardActions disableSpacing>
            <ExpandMore
              expand={sequenceData.is_expanded}
              onClick={handleSequenceClick}
              aria-expanded={sequenceData.is_expanded}
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
        </Box>

        <Collapse in={sequenceData.is_expanded} timeout="auto" unmountOnExit>
          <Box display={'flex'} flexDirection={'row'} flexWrap={'wrap'}>
            <SingleLineInput text='Stim. protocol' />
            <SingleLineInput text='Stim. protocol' />
            <SingleLineInput text='Fyzio raw file' />
            <MultiLineInput label='Measurement notes' />
            <Box m={1}>
              <Box
                sx={{
                  fontWeight: 'bold'
                }}
              >
                General
              </Box>
              <Box display={'flex'} flexDirection={'row'}>
                <CheckboxInput text='EEG' />
                <CheckboxInput text='ET' />
              </Box>
            </Box>
            <Box m={1}>
              <Box
                sx={{
                  fontWeight: 'bold'
                }}
              >
                BP ExG
              </Box>
              <Box display={'flex'} flexDirection={'row'}>
                <CheckboxInput text='EKG' />
                <CheckboxInput text='Resp.' />
                <CheckboxInput text='GSR' />
                <CheckboxInput text='ACC' />
              </Box>
            </Box>
            <Box m={1}>
              <Box
                sx={{
                  fontWeight: 'bold'
                }}
              >
                Siemens
              </Box>
              <Box display={'flex'} flexDirection={'row'}>
                <CheckboxInput text='EKG' />
                <CheckboxInput text='Resp.' />
                <CheckboxInput text='GSR' />
                <CheckboxInput text='ACC' />
              </Box>
            </Box>
          </Box>
        </Collapse>
      </Box>
    </CommonCard >
  )
}
