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
    <div id='homepage-container'>
      <div id='header-container'>
        <div id='left-header'>
          {/* <img
            className='bongo'
            src={
              'https://s1.pearlcdn.com/SEA/Upload/Community/49acf16fd0320200129001213276.gif'
            }
            alt='giffy'
          /> */}
          <h1 className='title'>KEEBUILDS</h1>
        </div>

        <div id='right-header'>
          <SavedBuildsButton username={username} />
          <Login setUsername={setUsername} />
          <Signup setUsername={setUsername} />
        </div>
      </div>

      <div id='main-container'>
        <h1>Your perfect keyboard is just clicks away</h1>
        <StartBuild username={username} />
      </div>

      <footer id='footer-container'></footer>
    </div>
  );
};

export default HomePage;
