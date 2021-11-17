import './App.css';
import React from 'react';
import { Routes, Route, } from 'react-router-dom';

import Inicio from './layouts/Inicio';
import MM1 from './layouts/MM1';
import MMS from './layouts/MMS';
import MMSK from './layouts/MMSK';
import MG1 from './layouts/MG1';

function App() {
  return (
    <Routes>
        <>
          <Route exact path="/" element={<Inicio/>}/>
          <Route exact path="/mm1" element={<MM1/>}/>
          <Route exact path="/mms" element={<MMS/>}/>
          <Route exact path="/mmsk" element={<MMSK/>}/>
          <Route exact path="/mg1" element={<MG1/>}/>
        </>
    </Routes>
  );
}

export default App;
