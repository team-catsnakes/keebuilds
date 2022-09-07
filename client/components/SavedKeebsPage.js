import React from 'react';
import '../scss/styles.scss';
import axios from 'axios';
import SavedBuilds from './SavedBuilds';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';


const fetchBuilds = async () => {
  const allBuilds = await axios.get('/api/session/0');
  return allBuilds.data;
};




const SavedKeebsPage = () => {
  const [builds, setBuilds] = React.useState([]);

  const setter = () => {
    fetchBuilds()
      .then(response => {
        if(JSON.stringify(response) !== JSON.stringify(builds)){
          setBuilds(response);
        }
      });
  };
  setter();

  return (
    <>
      <Link to="/">
        <Button sx={{ width: '200px', color: 'rgb(65, 91, 152)' }} variant="outlined">Back</Button>
      </Link>
      <h1>Saved Builds</h1>
      <div className='savedBuildsContainer'><SavedBuilds builds={builds} setter = {setter}></SavedBuilds></div>

    </>
  );
};

export default SavedKeebsPage;
