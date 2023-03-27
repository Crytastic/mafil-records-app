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
  name: string;
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

function SingleLineInput({ name, label, value, onChange }: SingleLineInputProps) {
  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    onChange(event);
  };

  return (
    <Box m={1} minWidth={240} flexGrow={1}>
      <Box
        sx={{
          fontWeight: 'bold'
        }}
      >
        {label}
      </Box>
      <Box>
        <TextField
          key={`${name}-key`}
          label={label}
          name={name}
          value={value}
          onChange={handleTextChange}
          fullWidth
          variant="outlined"
        />
      </Box>
    </Box >
  )
}

interface MultiLineInputProps {
  name: string;
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

function MultiLineInput({ name, label, value, onChange }: MultiLineInputProps) {
  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    onChange(event);
  };

  return (
    <Box m={1} minWidth={240} flexGrow={1}>
      <TextField
        key={`${name}-key`}
        label={label}
        name={name}
        value={value}
        onChange={handleTextChange}
        fullWidth
        multiline
        variant="outlined"
        maxRows={5}
      />
    </Box>
  )
}

interface CheckboxInputProps {
  text: string;
  checked: boolean;
  name: string;
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

  function CheckboxInput({ text, checked, name }: CheckboxInputProps) {
    return (
      <Box>
        <FormControlLabel control={
          <Checkbox
            checked={checked}
            onChange={handleCheckboxChange}
            name={name}
            color="primary"
          />
        } label={text} />
      </Box>
    )
  }

  const [sequenceData, setSequenceData] = useState(() => {
    const localSeq = localStorage.getItem(`sequence-${seq.id}`);
    return localSeq ? JSON.parse(localSeq) : {
      seq_state: 'pending',
      is_expanded: false,
      measured: new Date().toLocaleTimeString(),
      last_updated: new Date().toLocaleTimeString(),
      measurement_notes: '',
      stim_protocol: '',
      stim_log_file: '',
      fyzio_raw_file: '',
      general_eeg: false,
      general_et: false,
      bp_ekg: false,
      bp_resp: false,
      bp_gsr: false,
      bp_acc: false,
      siemens_ekg: false,
      siemens_resp: false,
      siemens_gsr: false,
      siemens_acc: false,
    };
  });

  useEffect(() => {
    localStorage.setItem(`sequence-${seq.id}`, JSON.stringify(sequenceData))
  }, [sequenceData]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSequenceData({
      ...sequenceData,
      [event.target.name]: event.target.checked,
      last_updated: new Date().toLocaleTimeString()
    });
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setSequenceData({
      ...sequenceData,
      [name]: value,
      last_updated: new Date().toLocaleTimeString()
    });
  };

  function handleSeqStateChange(event: SelectChangeEvent<unknown>) {
    setSequenceData({
      ...sequenceData,
      seq_state: event.target.value as SequenceStateEnum,
      last_updated: new Date().toLocaleTimeString()
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
            <Box>Measured: {sequenceData.measured}</Box>
            <Box>Last updated: {sequenceData.last_updated}</Box>
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
            <SingleLineInput label='Stim. protocol' name='stim_protocol' value={sequenceData.stim_protocol} onChange={handleTextChange} />
            <SingleLineInput label='Stim. log file' name='stim_log_file' value={sequenceData.stim_log_file} onChange={handleTextChange} />
            <SingleLineInput label='Fyzio raw file (for Siemens)' name='fyzio_raw_file' value={sequenceData.fyzio_raw_file} onChange={handleTextChange} />
            <MultiLineInput label='Measurement notes' name='measurement_notes' value={sequenceData.measurement_notes} onChange={handleTextChange} />
            <Box m={1}>
              <Box
                sx={{
                  fontWeight: 'bold'
                }}
              >
                General
              </Box>
              <Box display={'flex'} flexDirection={'row'}>
                <CheckboxInput text='EEG' checked={sequenceData.general_eeg} name="general_eeg" />
                <CheckboxInput text='ET' checked={sequenceData.general_et} name="general_et" />
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
                <CheckboxInput text='EKG' checked={sequenceData.bp_ekg} name="bp_ekg" />
                <CheckboxInput text='Resp.' checked={sequenceData.bp_resp} name="bp_resp" />
                <CheckboxInput text='GSR' checked={sequenceData.bp_gsr} name="bp_gsr" />
                <CheckboxInput text='ACC' checked={sequenceData.bp_acc} name="bp_acc" />
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
                <CheckboxInput text='EKG' checked={sequenceData.siemens_ekg} name="siemens_ekg" />
                <CheckboxInput text='Resp.' checked={sequenceData.siemens_resp} name="siemens_resp" />
                <CheckboxInput text='GSR' checked={sequenceData.siemens_gsr} name="siemens_gsr" />
                <CheckboxInput text='ACC' checked={sequenceData.siemens_acc} name="siemens_acc" />
              </Box>
            </Box>
          </Box>
        </Collapse>
      </Box>
    </CommonCard >
  )
}
