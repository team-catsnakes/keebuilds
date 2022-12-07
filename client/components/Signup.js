import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';

export default function Signup({ setUsername }) {
  const [open, setOpen] = React.useState(false);

  const [userInput, setUserInput] = React.useState({
    username: '',
    password: '',
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserInput({
      ...userInput,
      [name]: value,
    });
    console.log('HANDLE CHANGE', name, value);
  };

  const handleSubmit = async (e) => {
    //Prevents default behavior of a SUBMIT action
    e.preventDefault();

    const requestOptions = {
      username: userInput.username,
      password: userInput.password,
    };

    try {
      const postResponse = await axios.post('/api/signup', requestOptions);
      setUsername(postResponse.data);
      handleClose();
    } catch (err) {
      // alert('Username already exists');
      console.log(alert);
    }
  };

  return (
    <div>
      <Button variant='outlined' onClick={handleClickOpen}>
        Sign Up
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>SIGNUP</DialogTitle>
        <DialogContent>
          <DialogContentText>Signup to make bongocat happy</DialogContentText>
          <TextField
            autoFocus
            margin='dense'
            id='username'
            label='username'
            type='text'
            fullWidth
            variant='standard'
            name='username'
            onChange={handleChange}
          />
          <TextField
            autoFocus
            margin='dense'
            id='password'
            label='password'
            type='password'
            fullWidth
            variant='standard'
            name='password'
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
