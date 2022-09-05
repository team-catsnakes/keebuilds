import * as React from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import { FormControlLabel } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import '../scss/styles.scss';

// stepper labels
const steps = ['Case size', 'PCB', 'Plate', 'Switches', 'Keycaps'];
// radio button groups for each step
const options = [
  ['60%', '65%', '75%', 'TKL', '100%'],
  ['Hotswap', 'Traditional'],
  ['Polycarbonate', 'Aluminum', 'Brass'],
  ['Linear', 'Tactile', 'Clicky'],
  ['GMK', 'KAT', 'PBT']
];

const StartBuild = () => {
  // saving state of selected build
  const [build, setBuild] = React.useState({
    0: '',
    1: '',
    2: '',
    3: '',
    4: '',
  });
  // state to open and close dialogue form
  const [open, setOpen] = React.useState(false);
  // state for current step user is on
  const [activeStep, setActiveStep] = React.useState(0);
  // state for selected value of each radio group
  const [value, setValue] = React.useState('');
  // handles opening of dialogue form
  const handleClickOpen = () => setOpen(true);

  // handles closing of dialogue form
  const handleClose = () => {
    setOpen(false);
    setActiveStep(0);
    setBuild({
      0: '',
      1: '',
      2: '',
      3: '',
      4: '',
    });
  };

  const handleNext = () => {
    console.log('activeStep:', activeStep);
    // save current selected value to build state when clicking next
    setBuild({
      ...build,
      [activeStep]: value
    });

    setValue('');
    setActiveStep(activeStep + 1);
  };

  // having post request in handleNext doesnt catch last keycap value since state is set once the handleNext function ends
  React.useEffect(() => {
    axios
      .post('/api', {
        size: build[0],
        pcb: build[1],
        plate: build[2],
        switch: build[3],
        keycap: build[4],
        name: 'my first build',
        color: 'blue',
        session: 0
      });
    console.log('POST REQUEST: ', {
      size: build[0],
      pcb: build[1],
      plate: build[2],
      switch: build[3],
      keycap: build[4],
      name: 'my first build',
      color: 'blue',
      session: 0
    });
  }, [build[4]]);

  console.log('build: ', build);

  const handleBack = () => {
    setActiveStep(activeStep - 1);
    setValue('');
  };

  const handleReset = () => {
    // closes dialogue form when clicking "close"
    setOpen(false);
    setActiveStep(0);
    setValue('');
    // resets state of build for new build
    setBuild({
      0: '',
      1: '',
      2: '',
      3: '',
      4: '',
    });
  };

  // sets current value for selected radio button
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  console.log('selected radio value:', value);

  // renders radio buttons for each step in stepper
  const getContent = (activeStep) => {
    const radios = [];
    for (let i = 0; i < options[activeStep].length; i++) {
      radios.push(
        <FormControlLabel value={options[activeStep][i]} control={<Radio/>} label={options[activeStep][i]}/>
      );
    }
    return radios;
  };

  return (
    <div className="startBuild">
      <Button sx={{ width: '200px', color: 'rgb(65, 91, 152)' }} variant="outlined" onClick={handleClickOpen}>Start Build</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create a new build</DialogTitle>
        <DialogContent>
          <div>
            <Box sx={{ width: '100%' }}>
              <Stepper activeStep={activeStep}>
                {steps.map(label => {
                  return (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  );
                })}
              </Stepper>
              {activeStep === steps.length ? (
                <React.Fragment>
                  <Typography sx={{ mt: 2, mb: 1 }}>
                    Your new build is saved!
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Box sx={{ flex: '1 1 auto' }} />
                    <Button onClick={handleReset}>Close</Button>
                  </Box>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Typography sx={{ mt: 2, mb: 1 }}>
                    <FormControl>
                      <FormLabel id="demo-controlled-radio-buttons-group">Select {activeStep === 1 ? steps[activeStep] : steps[activeStep].toLowerCase()}:</FormLabel>
                      <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={value}
                        onChange={handleChange}
                      >
                        {getContent(activeStep)}
                      </RadioGroup>
                    </FormControl>
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Button
                      color="inherit"
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      sx={{ mr: 1 }}
                    >
                    Back
                    </Button>
                    <Box sx={{ flex: '1 1 auto' }} />
                    <Button onClick={handleNext} disabled={!value}>
                      {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                  </Box>
                </React.Fragment>
              )}
            </Box>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StartBuild;

