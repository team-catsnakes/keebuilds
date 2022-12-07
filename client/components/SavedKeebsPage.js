import React from 'react';
import '../scss/styles.scss';
import axios from 'axios';
import SavedBuilds from './SavedBuilds';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

<<<<<<< HEAD
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
=======
//Modify to only fetch builds with relevant account _id
const fetchBuilds = async (currentUser) => {
  const allBuilds = await axios.get(`/api/session/'${currentUser}'`);//`${username}`
  return allBuilds.data;
};




const SavedKeebsPage = (props) => {
  const [builds, setBuilds] = React.useState([]);
  const {currentUser, setUser} = props;
  const setter = () => {
    fetchBuilds(currentUser)
      .then(response => {
        if(JSON.stringify(response) !== JSON.stringify(builds)){
          setBuilds(response);
        }
      });
>>>>>>> 0ee11b98ab680274dc810f74fbe1b002152d9ca7
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
