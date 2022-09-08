import React from 'react';
import Button from '@mui/material/Button';
import '../scss/styles.scss';
import StartBuild from './StartBuild';
import SavedBuilds from './SavedBuilds';
import SavedBuildsButton from './SavedBuildsButton';
import logo from '../assets/bongocat.png';
import bongocat from '../assets/bongocatkeyboard.png';
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
      </div>
      <div className='savedBuildsButtonDiv'><SavedBuildsButton /></div>
    </>
  );
};

export default HomePage;
