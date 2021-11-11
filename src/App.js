import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import { Backdrop, CircularProgress, Button } from '@material-ui/core';
import { Routes, Route, Navigate } from 'react-router-dom';

import Inicio from './layouts/Inicio';
import MM1 from './layouts/MM1';

function App() {
  return (
    <Routes>
        <>
          <Route exact path="/" element={<Inicio/>}/>
          <Route exact path="/mm1" element={<MM1/>}/>
        </>
    </Routes>
  );
}

export default App;
