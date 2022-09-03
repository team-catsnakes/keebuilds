import React from 'react';
// import bongocat from '../assets/bongocat.png';
import StartBuild from './StartBuild';
import SavedBuilds from './SavedBuilds';
import '../scss/styles.scss';

const App = () => (
  <div>
    {/* <img src={bongocat} alt="Bongo Cat"/> */}
    <h1 className='logo'>KEEBUILDS</h1>
    <div className='startBuildButtonDiv'><StartBuild/></div>
    <div className='savedBuildsButtonDiv'><SavedBuilds/></div>
  </div>
);

export default App;
