import React from 'react';
import '../scss/styles.scss';
import axios from 'axios';
import SavedBuilds from './SavedBuilds';


const fetchBuilds = async () => {
  const allBuilds = await axios.get('/api/session/0');
  console.log('data from saved builds get request: ', allBuilds.data);
  return allBuilds.data;
};




const SavedKeebsPage = () => {
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
    <>
      <h1>You are on the saved Keebs page. Make yourself at home.</h1>
      <div className='savedBuildsContainer'><SavedBuilds builds={builds}></SavedBuilds></div>

    </>
  );
};

export default SavedKeebsPage;
