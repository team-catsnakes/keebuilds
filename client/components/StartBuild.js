import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
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


const steps = ['Case size', 'PCB', 'Plate', 'Switches', 'Keycaps'];

const options = [
  ['60%', '65%', '75%', 'TKL', '100%'],
  ['Hotswap', 'Traditional'],
  ['Polycarbonate', 'Aluminum', 'Brass'],
  ['Linear', 'Tactile', 'Clicky'],
  ['GMK', 'KAT', 'PBT']
];

const finalBuild = {};

const StartBuild = () => {

  // dialogue form 
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setActiveStep(0);
  };

  // stepper
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepOptional = (step) => {
    return step === -1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);

    switch(activeStep){
    case 0:
      finalBuild['size'] = value;
      break;
    case 1:
      finalBuild['pcb'] = value;
      break;
    case 2:
      finalBuild['plate'] = value;
      break;
    case 3:
      finalBuild['switch'] = value;
      break;
    case 4:
      finalBuild['keycap'] = value;
      break;  
    }
    setValue('');
    console.log(finalBuild);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setValue('');
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error('You can\'t skip a step that isn\'t optional.');
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setOpen(false);
    setActiveStep(0);
    setValue('');
  };


  // radio buttons
  const [value, setValue] = React.useState('');
  console.log(value);

  const handleChange = (event) => {
    setValue(event.target.value);
    
  };

  const getContent = (activeStep) => {
    const radios = [];
    for (let i = 0; i < options[activeStep].length; i++) {
      radios.push(
        <FormControlLabel value={options[activeStep][i]} control={<Radio required = { true } />} label={options[activeStep][i]}/>
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
                {steps.map((label, index) => {
                  const stepProps = {};
                  const labelProps = {};
                  if (isStepOptional(index)) {
                    labelProps.optional = (
                      <Typography variant="caption">Optional</Typography>
                    );
                  }
                  if (isStepSkipped(index)) {
                    stepProps.completed = false;
                  }
                  return (
                    <Step key={label} {...stepProps}>
                      <StepLabel {...labelProps}>{label}</StepLabel>
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
                      <FormLabel id="demo-controlled-radio-buttons-group">Select {activeStep === 1 ? steps[activeStep] : steps[activeStep].toLowerCase()}</FormLabel>
                      <RadioGroup
                        
                        name="nameRadio"
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
                    {isStepOptional(activeStep) && (
                      <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
                      </Button>
                    )}

                    <Button onClick={handleNext} disabled = {!value}>

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

