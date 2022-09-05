import React from 'react';
// import bongocat from '../assets/bongocat.png';
import StartBuild from './StartBuild';
import SavedBuilds from './SavedBuilds';
import '../scss/styles.scss';
import logo from '../assets/bongocat.png';

const App = () => (
  <div>
    
    <h1 className='logo'>KEEBUILDS</h1>
    {/* <img src={logo} alt="Bongo Cat" /> */}
    <div className='startBuildButtonDiv'><StartBuild/></div>
    <div className='savedBuildsButtonDiv'><SavedBuilds/></div>
    
  </div>
);

export default App;
