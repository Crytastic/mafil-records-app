import React, { Component, FunctionComponent, useState } from 'react';
import './App.css';
import 'fontsource-roboto';
import Landing from './pages/Landing';
import Measuring from './pages/Measuring';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import ChooseVisit from './pages/ChooseVisit';
import SuccessfulVisit from './pages/SuccessfulVisit';
import { VisitProps } from './components/Visit';
import AppContext from './components/VisitContext';

const App = () => {
  const [visit, setVisit] = useState<VisitProps | null>(null);

  return (
    <AppContext.Provider value={{ visit, setVisit }}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Landing />} />
            <Route path='/visits' element={<ChooseVisit />} />
            <Route path='/measuring' element={<Measuring />} />
            <Route path='/success' element={<SuccessfulVisit />} />
          </Routes>
        </BrowserRouter>
      </Box>
    </AppContext.Provider>
  );
}

export default App;
