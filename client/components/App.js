import React, { useEffect } from 'react';
// import bongocat from '../assets/bongocat.png';
import StartBuild from './StartBuild';
import SavedBuilds from './SavedBuilds';

import SavedBuildsButton from './SavedBuildsButton';
import '../scss/styles.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import SavedKeebsPage from './SavedKeebsPage';


const App = () => {

  return (
    <div>
      <Routes>
        <Route path='/' element={<HomePage/>}></Route> localhost:8080/api/users -> localhost:3000/api/users
        <Route path='/savedKeebs' element={<SavedKeebsPage />}></Route>
      </Routes>
    </div>
  );
};

export default App;
