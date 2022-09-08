import React from 'react';
import Button from '@mui/material/Button';
import '../scss/styles.scss';
import StartBuild from './StartBuild';
import SavedBuilds from './SavedBuilds';
import SavedBuildsButton from './SavedBuildsButton';
import logo from '../assets/bongocat.png';
import bongocat from '../assets/bongocatkeyboard.png';
import Login from './Login';
import Signup from './Signup';

const HomePage = ({ username, setUsername }) => {
  return (
    <>
      <Login setUsername={ setUsername } />
      <Signup setUsername={ setUsername } />
      <h1 className='logo'>KEEBUILDS</h1>
      <div className='startBuildButtonDiv'>
        <img src={bongocat} alt='Bongo Cat' />
        <StartBuild username={username} />
      </div>
      <div className='savedBuildsButtonDiv'>
        <SavedBuildsButton />
      </div>
    </>
  );
};

export default HomePage;
