import React, {useState} from 'react';
import { Grid, Button, Tabs, Tab, Box, TextField,
    FormControl, FormControlLabel, RadioGroup } from '@material-ui/core';
import { Link } from 'react-router-dom';

import NavBar from '../components/NavBar';

function Inicio() {
    const [ansError, setAnsError] = useState(false);
    const [lambda, setLambda] = useState();
    const [miu, setMiu] = useState();

    const handleSubmit = (event) => {
        event.preventDefault();
      };
    
    const handleLambdaChange = (event) => {
        setLambda(event.target.value);
    };
    const handleMiuChange = (event) => {
        setMiu(event.target.value);
    };
  
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