import React from 'react';
import Button from '@mui/material/Button';
import '../scss/styles.scss';

const SavedBuildsButton = () => {

  const handleGet = () => {
    // redirect to saved builds page
  };

  return (
    <div className="savedBuildsButton">
      <Button sx={{ width: '200px', color: 'rgb(65, 91, 152)' }} variant="outlined" onClick={handleGet}>Saved Keebs</Button>
    </div>
  );
};

export default SavedBuildsButton;
