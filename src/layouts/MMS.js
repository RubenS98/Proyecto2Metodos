import React, { useState, useEffect } from 'react';
import { Grid, Button, Box, TextField,
  FormControl, FormHelperText } from '@material-ui/core';

import NavBar from '../components/NavBar';
import axios from 'axios';

function MMS() {
  const [ansError, setAnsError] = useState(false);
  const [helperText1, setHT1] = useState('');
  const [helperText2, setHT2] = useState('');
  const [helperText3, setHT3] = useState('');
  const [lambda, setLambda] = useState();
  const [miu, setMiu] = useState();
  const [s, setS] = useState();
  const [n, setN] = useState();
  const [cw, setCW] = useState();
  const [cs, setCS] = useState();
  const [pn, setPN] = useState("");
  const [ct, setCT] = useState("");
  const [values, setValues] = useState(["","","","","",""]);
  const [count, setCount]=useState(0);

  const handleSubmit = (event) => {
      event.preventDefault();
      setCount(count+1);
    };
  const handleSubmit2 = (event) => {
    event.preventDefault();
    let result;
    if (n<0){
        setHT2('Valores deben ser mayores a 0.')
      }
      else{
        setHT2('')
        if(n<s){
            result=((lambda/miu)**n)/fact(n)
        }
        else{
            result=((lambda/miu)**n)/(fact(s)*s**(n-s))
        }
        setPN((values[1]*result).toFixed(10));
      }
    
  };
  const handleSubmit3 = (event) => {
    event.preventDefault();
    if (cw<0 || cs<0){
        setHT3('Valores deben ser mayores a 0.')
      }
      else{
        setHT3('')
        setCT(values[2]*cw+s*cs);
      }
    
  };

  const fact = (num) => {
    if (num === 0)
      { return 1; }
    else
      { return num * fact( num - 1 ); }
};
  
  const handleLambdaChange = (event) => {
      setLambda(event.target.value);
  };
  const handleMiuChange = (event) => {
      setMiu(event.target.value);
  };
  const handleSChange = (event) => {
    setS(event.target.value);
};
  const handleNChange = (event) => {
    setN(event.target.value);
  };
  const handleCWChange = (event) => {
    setCW(event.target.value);
  };
  const handleCSChange = (event) => {
    setCS(event.target.value);
  };

  useEffect( () => {
      const fetchData = async () => {
        try {
          const res = await axios({
            url: `http://localhost:8000/mms/${lambda}/${miu}/${s}`,
          });
          
          setValues([res.data.roh.toFixed(10),res.data.P0.toFixed(10),res.data.Lq.toFixed(10),
            res.data.L.toFixed(10),res.data.Wq.toFixed(10),res.data.W.toFixed(10)])
        } catch (error) {
          console.log(error);
        }
      };
      if (lambda<0 || miu<0 || s<0){
        setHT1('Valores deben ser mayores a 0.')
      }
      else if(lambda>(miu*s)){
        setHT1('Miu por s debe ser mayor a lambda.')
      }
      else{
        setHT1('')
        fetchData();
      }
    
  }, [ count ]);

  return (
      <Grid container spacing={3} align='center'>
          <Box sx={{ width: '100%' }}>
              <NavBar position={2}/>
          </Box>
          <Grid container item xs={12} alignItems="center" justifyContent="space-evenly" style={{padding:'1%'}}>
            <Grid item xs={12}>
              <h1>M/M/S</h1>
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
                            <TextField
                                id="s"
                                label="s"
                                type="number"
                                variant="filled"
                                value={s}
                                onChange={handleSChange}
                            />
                        <Button type="submit" variant="contained" style={{color: 'black', background: 'white'}}>
                            Calcular
                        </Button>
                        <FormHelperText style={{color:'red'}}>{helperText1}</FormHelperText>
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
                          <FormHelperText style={{color:'red'}}>{helperText2}</FormHelperText>
                      </FormControl>
                  </form>
              </Grid>
              <Grid item xs={7}>
                  <Box sx={{border: '1px solid grey', padding: '4px' }}>
                  <div>
                  <TextField
                      disabled
                      id="pn"
                      label="Pn"
                      value={pn}
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
              <h2>Cálculo Costo Total de Servicio</h2>
            </Grid>
              <Grid item xs={4}>
                  <form onSubmit={handleSubmit3}>
                      <FormControl error={ansError} component="fieldset">
                              <TextField
                                  id="cw"
                                  label="Cw"
                                  type="number"
                                  variant="filled"
                                  value={cw}
                                  onChange={handleCWChange}
                              />
                              <TextField
                                  id="cs"
                                  label="Cs"
                                  type="number"
                                  variant="filled"
                                  value={cs}
                                  onChange={handleCSChange}
                              />
                          <Button type="submit" variant="contained" style={{color: 'black', background: 'white'}}>
                              Calcular
                          </Button>
                          <FormHelperText style={{color:'red'}}>{helperText3}</FormHelperText>
                      </FormControl>
                  </form>
              </Grid>
              <Grid item xs={7}>
                  <Box sx={{border: '1px solid grey', padding: '4px' }}>
                  <div>
                  <TextField
                      disabled
                      id="ct"
                      label="Ct"
                      value={ct}
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

export default MMS