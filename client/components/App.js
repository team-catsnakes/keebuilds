import React, { useEffect } from 'react';
// import bongocat from '../assets/bongocat.png';
import StartBuild from './StartBuild';
import SavedBuilds from './SavedBuilds';

import SavedBuildsButton from './SavedBuildsButton';
import '../scss/styles.scss';
import logo from '../assets/bongocat.png';
import axios from 'axios';

const fetchBuilds = async () => {
  const allBuilds = await axios.get('/api/session/0');
  console.log('data from saved builds get request: ', allBuilds.data);
  return allBuilds.data;
};

const App = () => {
  const [builds, setBuilds] = React.useState([]);


  const setter = () => {
    fetchBuilds()
      .then(response => {
        if(response.some(build => !builds.map(b => b.name).includes(build.name))){
          setBuilds(response);
        }
      });
  };
  setter();

  return (
    <div>
    
      <h1 className='logo'>KEEBUILDS</h1>
      {/* <img src={logo} alt="Bongo Cat" /> */}
      <div className='startBuildButtonDiv'><StartBuild setBuildsParent={setter}/></div>
      <div className='savedBuildsButtonDiv'><SavedBuildsButton /></div>
      <div className='savedBuildsContainer'><SavedBuilds builds={builds}></SavedBuilds></div>
    
    </div>
  )};

export default App;
