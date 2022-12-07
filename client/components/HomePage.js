import React from 'react';
import Button from '@mui/material/Button';
import '../scss/styles.scss';
import StartBuild from './StartBuild';
import SavedBuilds from './SavedBuilds';
import SavedBuildsButton from './SavedBuildsButton';
import logo from '../assets/bongocat.png';
import bongocat from '../assets/bongocatkeyboard.png';
<<<<<<< HEAD
import Login from './Login';
import Signup from './Signup';

const HomePage = ({ username, setUsername }) => {
  return (
    <>
      <Login setUsername={setUsername} />
      <Signup setUsername={setUsername} />
      <h1 className='logo'>KEEBUILDS</h1>
      <div>
        <img
          src={
            'https://s1.pearlcdn.com/SEA/Upload/Community/49acf16fd0320200129001213276.gif'
          }
          alt='giffy'
        />
      </div>
      <div className='startBuildButtonDiv'>
        <img src={bongocat} alt='Bongo Cat' />

        <StartBuild username={username} />
      </div>
      <div className='savedBuildsButtonDiv'>
        <SavedBuildsButton />
=======
import FormDialog from './Login';

const HomePage = (props) => {
  const {currentUser, setUser} = props;
  return (
    <>
      <FormDialog currentUser={currentUser} setUser={setUser}/>
      <h1 className='logo'>KEEBUILDS</h1>
      <div className='startBuildButtonDiv'>
        <img src={bongocat} alt="Bongo Cat" />
        <StartBuild currentUser={currentUser} setUser={setUser}/>
>>>>>>> 0ee11b98ab680274dc810f74fbe1b002152d9ca7
      </div>
    </>
  );
};

export default HomePage;
