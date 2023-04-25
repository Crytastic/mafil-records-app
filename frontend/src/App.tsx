import React from 'react';
import './App.css';
import 'fontsource-roboto';
import Landing from './pages/Landing';
import Measuring from './pages/Measuring';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Studies from './pages/Studies';
import SuccessfulVisit from './pages/SuccessfulVisit';
import oidcConfig from './oidc-config';
import { AuthProvider } from 'react-oidc-context';
import { useAuth } from "react-oidc-context";
import OidcLogin from './pages/OidcLogin';

const App = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AuthProvider {...oidcConfig}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Landing />} />
            <Route path='/oidc-login' element={<OidcLogin />} />
            <Route path='/studies' element={<Studies />} />
            <Route path='/measuring' element={<Measuring />} />
            <Route path='/success' element={<SuccessfulVisit />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </Box>
  );
}

export default App;
