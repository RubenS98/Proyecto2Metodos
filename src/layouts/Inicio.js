import React from 'react';
import { Grid, Box } from '@material-ui/core';

import NavBar from '../components/NavBar';

function Inicio() {
  
    return (
        <Grid container spacing={3} align='center'>
            <Box sx={{ width: '100%' }}>
                <NavBar position={0}/>
            </Box>
            <Grid container item xs={12} alignItems="center" justifyContent="space-evenly" style={{padding:'2%'}}>
              <Grid item xs={12}>
                <h1>SIMULADOR DE MODELOS DE FILAS DE ESPERA</h1>
              </Grid>
              <Grid item xs={6}>
                <p>Simulador los siguientes casos de la teor&iacute;a de filas.</p>
                <ul>
                  <li>Modelo M/M/1</li>
                  <li>Modelo M/M/s</li>
                  <li>Modelo M/M/sK</li>
                  <li>Modelo M/G/1</li>
                </ul>

                <h3>TC2007</h3>
                <h3>Profesor: Leopoldo Cendejas Morales</h3>
                <h3>Equipo:</h3>
                <h5>Carlos De la Garza Macías             | A01024712</h5>
                <h5>Eduardo Harari Haber              | A01025876</h5>
                <h5>Rubén Sánchez Rodríguez             | A01021759</h5>
                <h5>José Javier Tlacuilo Fuentes            | A01420128</h5>
                <h5>Alonso Sebastián Varela Sandoval        | A01335705</h5>
              </Grid>
            </Grid>
        </Grid>
    );
}

export default Inicio
