import React, { useState, useEffect } from 'react';
import { Grid, Button, Tabs, Tab, Box, TextField,
  FormControl, FormControlLabel, RadioGroup } from '@material-ui/core';

import NavBar from '../components/NavBar';
import axios from 'axios';

function MM1() {
  const [ansError, setAnsError] = useState(false);
  const [lambda, setLambda] = useState();
  const [miu, setMiu] = useState();
  const [n, setN] = useState();
  const [pn, setPN] = useState("");
  const [values, setValues] = useState(["","","","","",""]);
  const [count, setCount]=useState(0);

  const handleSubmit = (event) => {
      event.preventDefault();
      setCount(count+1);
    };
  const handleSubmit2 = (event) => {
    event.preventDefault();
    setPN(values[1]*values[0]**n);
  };
  
  const handleLambdaChange = (event) => {
      setLambda(event.target.value);
  };
  const handleMiuChange = (event) => {
      setMiu(event.target.value);
  };
  const handleNChange = (event) => {
    setN(event.target.value);
};

  useEffect( () => {
      const fetchData = async () => {
        try {
          const res = await axios({
            url: `http://localhost:8000/mm1/${lambda}/${miu}`,
          });
          
          setValues([res.data.roh,res.data.Lq,res.data.Lq,res.data.L,res.data.Wq,res.data.W])
        } catch (error) {
          console.log(error);
        }
      };
      if (lambda<miu){
        fetchData();
      }
    
  }, [ count ]);

  return (
      <Grid container spacing={3} align='center'>
          <Box sx={{ width: '100%' }}>
              <NavBar position={1}/>
          </Box>
          <Grid container item xs={12} alignItems="center" justifyContent="space-evenly" style={{padding:'1%'}}>
            <Grid item xs={12}>
              <h1>M/M/1</h1>
            </Grid>
              <Grid item xs={4}>
                <form onSubmit={handleSubmit}>
                    <FormControl error={ansError} component="fieldset">
                            <TextField
                                id="lambda"
                                label="lambda"
                                type="number"
                                variant="filled"
                                value={lambda}
                                onChange={handleLambdaChange}
                            />
                            <TextField
                                id="miu"
                                label="miu"
                                type="number"
                                variant="filled"
                                value={miu}
                                onChange={handleMiuChange}
                            />
                        <Button type="submit" variant="contained" style={{color: 'black', background: 'white'}}>
                            Calcular
                        </Button>  
                    </FormControl>
                </form>
              </Grid>
              <Grid item xs={7}>
                  <Box sx={{border: '1px solid grey', padding: '4px' }}>
                  <div>
                  <TextField
                      disabled
                      id="roh"
                      label="roh"
                      value={values[0]}
                      variant="filled"
                      size="small"
                      margin="normal"
                      />
                  
                  <TextField
                      disabled
                      id="P0"
                      label="P0"
                      value={values[1]}
                      variant="filled"
                      size="small"
                      margin="normal"
                      />
                  </div>
                  <div>
                  <TextField
                      disabled
                      id="Lq"
                      label="Lq"
                      value={values[2]}
                      variant="filled"
                      size="small"
                      margin="normal"
                      />
                  <TextField
                      disabled
                      id="L"
                      label="L"
                      value={values[3]}
                      variant="filled"
                      size="small"
                      margin="normal"
                      />
                  <TextField
                      disabled
                      id="Wq"
                      label="Wq"
                      value={values[4]}
                      variant="filled"
                      size="small"
                      margin="normal"
                      />
                  <TextField
                      disabled
                      id="W"
                      label="W"
                      value={values[5]}
                      variant="filled"
                      size="small"
                      margin="normal"
                      />
                  </div>
                  </Box>
                  </Grid>
          </Grid>
          <Grid container item xs={12} alignItems="center" justifyContent="space-evenly" style={{padding:'1%'}}>
          <Grid item xs={12}>
              <h2>Cálculo Pn</h2>
            </Grid>
              <Grid item xs={4}>
                  <form onSubmit={handleSubmit2}>
                      <FormControl error={ansError} component="fieldset">
                              <TextField
                                  id="n"
                                  label="n"
                                  type="number"
                                  variant="filled"
                                  value={n}
                                  onChange={handleNChange}
                              />
                          <Button type="submit" variant="contained" style={{color: 'black', background: 'white'}}>
                              Calcular
                          </Button>  
                      </FormControl>
                  </form>
              </Grid>
              <Grid item xs={7}>
                  <Box sx={{border: '1px solid grey', padding: '4px' }}>
                  <div>
                  <TextField
                      disabled
                      id="pn"
                      label="pn"
                      value={pn}
                      variant="filled"
                      size="small"
                      margin="normal"
                      />
                  </div>
                  </Box>
                  </Grid>
          </Grid>
      </Grid>
  );
}

export default MM1