import React, { Component, FunctionComponent, useState } from 'react';
import './App.css';
import 'fontsource-roboto';
import Dashboard from './components/Dashboard';
import { w3cwebsocket as W3CWebSocket } from 'websocket';

// const client = new W3CWebSocket('ws://127.0.0.1:8000');

const App = () => {
  return (
    <div className="App">
      <Dashboard />
    </div>
  );
}

export default App;
