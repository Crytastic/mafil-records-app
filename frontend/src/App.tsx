import React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import 'fontsource-roboto';
import { AuthProvider } from 'react-oidc-context';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import oidcConfig from './oidc-config';
import Landing from './pages/Landing';
import Measuring from './pages/Measuring';
import OidcLogin from './pages/OidcLogin';
import OidcLogout from './pages/OidcLogout';
import Studies from './pages/Studies';
import SuccessfulVisit from './pages/SuccessfulVisit';
import OIDCCallback from './components/common/OidcCallback';

const App = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AuthProvider {...oidcConfig}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Landing />} />
            <Route path='/oidc-login' element={<OIDCCallback />} />
            <Route path='/oidc-logout' element={<OidcLogout />} />
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
