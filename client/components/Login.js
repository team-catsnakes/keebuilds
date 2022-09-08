import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';

export default function FormDialog(props) {
  const {curentUser, setUser} = props;
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
  const fetchUser = async () => {
    const loginInfo = {
      method: 'post',
      url: '/api/login',
      data: account
    };
    const user = await axios.post(loginInfo);
    return user.data;
  };
  const handleSubmit = async () => {
    const setter = () => {
      fetchUser()
        .then(response => {
          if(JSON.stringify(response) === JSON.stringify(account.username)){
            setUser(response);
          }
        });
    };
    setter();
    setOpen(false);
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
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
