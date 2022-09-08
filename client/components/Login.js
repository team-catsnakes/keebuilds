import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);

  //[state, action] 
  const [account, setAccount] = React.useState({
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
    setAccount({
      ...account,
      [name]: value,
    });
    console.log(account);
  };

  const handleSubmit = async () => {
    const loginInfo = {
      method: 'post',
      url: '/api/login',
      body: account
    };
    axios.post(loginInfo)
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((err) => console.log('Error in verifying the user'));
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Login
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Login</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please Log-in below
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="username"
            label="username"
            type="text"
            fullWidth
            variant="standard"
            name='username'
            onChange={handleChange}
          />
          <TextField
            autoFocus
            margin="dense"
            id="password"
            label="password"
            type="text"
            fullWidth
            variant="standard"
            name='password'
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
