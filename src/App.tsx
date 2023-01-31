import React, { Component, FunctionComponent, useState } from 'react';
import './App.css';
import 'fontsource-roboto';
import Landing from './pages/Landing';
import Measuring from './pages/Measuring';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { mdTheme } from './components/Components';
import { ThemeProvider } from '@mui/material';
import StartVisit from './pages/StartVisit';
import ChooseVisit from './pages/ChooseVisit';
import SuccessfulVisit from './pages/SuccessfulVisit';
import AbortedVisit from './pages/AbortedVisit';

// const client = new W3CWebSocket('ws://127.0.0.1:8000');

const App = () => {
  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Landing />} />
            <Route path='/startvisit' element={<StartVisit />} />
            <Route path='/choosevisit' element={<ChooseVisit />} />
            <Route path='/measuring' element={<Measuring />} />
            <Route path='/success' element={<SuccessfulVisit />} />
            <Route path='/abort' element={<AbortedVisit />} />
          </Routes>
        </BrowserRouter>
      </Box>
    </ThemeProvider>
  );
}

export default App;
