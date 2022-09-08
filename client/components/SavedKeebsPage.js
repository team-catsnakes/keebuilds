import React from 'react';
import '../scss/styles.scss';
import axios from 'axios';
import SavedBuilds from './SavedBuilds';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const SavedKeebsPage = ({ username }) => {
  const [builds, setBuilds] = React.useState([]);

  const fetchBuilds = async () => {
    const allBuilds = await axios.get(`/api/builds/${username}`);
    return allBuilds.data;
  };

  const setter = () => {
    fetchBuilds().then((response) => {
      if (JSON.stringify(response) !== JSON.stringify(builds)) {
        setBuilds(response);
      }
    });
  };
  setter();

  return (
    <>
      <Link to='/'>
        <Button
          sx={{ width: '200px', color: 'rgb(65, 91, 152)' }}
          variant='outlined'
        >
          Back
        </Button>
      </Link>
      <h1>Saved Builds</h1>
      <div className='savedBuildsContainer'>
        <SavedBuilds builds={builds} setter={setter}></SavedBuilds>
      </div>
    </>
  );
};

export default SavedKeebsPage;
