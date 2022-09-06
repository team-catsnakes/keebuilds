import React from 'react';
import Button from '@mui/material/Button';
import '../scss/styles.scss';
import StartBuild from './StartBuild';
import SavedBuilds from './SavedBuilds';
import SavedBuildsButton from './SavedBuildsButton';
import logo from '../assets/bongocat.png';





const HomePage = () => {



  return (
    <>
      <h1 className='logo'>KEEBUILDS</h1>
      {/* <img src={logo} alt="Bongo Cat" /> */}
      <div className='startBuildButtonDiv'>
        <StartBuild />
      </div>
      <div className='savedBuildsButtonDiv'><SavedBuildsButton /></div>
    </>
  );
};

export default HomePage;
