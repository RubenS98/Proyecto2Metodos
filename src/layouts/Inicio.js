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
                
            </Grid>
        </Grid>
    );
}

export default Inicio