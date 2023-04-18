import React, { useState } from 'react';
import './App.css';
import 'fontsource-roboto';
import Landing from './pages/Landing';
import Measuring from './pages/Measuring';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Studies from './pages/Studies';
import SuccessfulVisit from './pages/SuccessfulVisit';
import { StudyProps } from './components/Study';
import { ResizableSidebar } from './components/ResizableSidebar';
import SidebarDemo from './pages/SidebarDemo';

const App = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/studies' element={<Studies />} />
          <Route path='/measuring' element={<Measuring />} />
          <Route path='/success' element={<SuccessfulVisit />} />
          <Route path='/sidebar' element={<SidebarDemo />} />
        </Routes>
      </BrowserRouter>
    </Box>
  );
}

export default App;
