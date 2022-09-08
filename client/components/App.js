import React, { useEffect, useState } from 'react';
// import bongocat from '../assets/bongocat.png';
import StartBuild from './StartBuild';
import SavedBuilds from './SavedBuilds';

import SavedBuildsButton from './SavedBuildsButton';
import '../scss/styles.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import SavedKeebsPage from './SavedKeebsPage';

const App = () => {
  const [username, setUsername] = useState(''); // current session's username

  return (
    <div id="app-container">
      <Routes>
        <Route
          path='/'
          element={<HomePage username={username} setUsername={setUsername} />}
        ></Route>
        <Route
          path='/savedKeebs'
          element={<SavedKeebsPage username={username} />}
        ></Route>
      </Routes>
    </div>
  );
};

export default App;
