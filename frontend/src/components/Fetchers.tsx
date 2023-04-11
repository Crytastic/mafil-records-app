import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import MenuIcon from '@mui/icons-material/Menu';
import Badge from '@mui/material/Badge';
import RefreshIcon from '@mui/icons-material/Refresh';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import InfoItem from '../components/InfoItem'
import { CircularProgress } from '@material-ui/core';
import { AppBar, mdTheme, Logo, Drawer } from '../components/Components';
import { Visit, VisitProps } from '../components/Visit';
import { TextField } from '@material-ui/core';
import { BlueButton, RedButton } from '../components/Buttons';
import { useEffect, useState } from 'react';

const fetch = require('node-fetch');
const https = require('https');

export async function fetchVisits() {
  const url = 'http://devel.mafildb.ics.muni.cz:8000/json?start=2022-11-10T12:00:00&end=2022-11-25T12:00:00&level=STUDY&force_pacs';

  try {
    const resp = await fetch(
      url,
      {
        method: 'GET',
        headers: {
          'Authorization': 'Token c07d70fd9f56bc470a83c28bcd0a4718ff198570'
        },
        mode: 'cors',
      });
    const json = await resp.json();
    const parsedVisits = json.map((visit: any) => {
      const parsedDate = new Date(visit.StudyDate.substr(0, 4), parseInt(visit.StudyDate.substr(4, 2)) - 1, visit.StudyDate.substr(6, 2));
      return { ...visit, StudyDate: parsedDate };
    });
    return parsedVisits;
  } catch (err) {
    console.error(err)
    return [];
  }
}

export async function fetchSeries(accessionNumber: string) {
  const url = `http://devel.mafildb.ics.muni.cz:8000/json?accession_number=${accessionNumber}&level=SERIES`;

  try {
    const resp = await fetch(
      url,
      {
        method: 'GET',
        headers: {
          'Authorization': 'Token c07d70fd9f56bc470a83c28bcd0a4718ff198570'
        },
        mode: 'cors',
      });
    const json = await resp.json();
    console.log(json[0].series)
    return json[0].series;
  } catch (err) {
    console.error(err)
    return [];
  }
}