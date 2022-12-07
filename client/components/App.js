<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
=======
import React from 'react';
>>>>>>> 0ee11b98ab680274dc810f74fbe1b002152d9ca7
// import bongocat from '../assets/bongocat.png';
import StartBuild from './StartBuild';
import SavedBuilds from './SavedBuilds';

import SavedBuildsButton from './SavedBuildsButton';
import '../scss/styles.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import SavedKeebsPage from './SavedKeebsPage';

const App = () => {
<<<<<<< HEAD
  const [username, setUsername] = useState(''); // current session's username
=======

  const [currentUser, setUser] = React.useState({
    username: '',
    password: '',
  });
>>>>>>> 0ee11b98ab680274dc810f74fbe1b002152d9ca7

  return (
    <div>
      <Routes>
<<<<<<< HEAD
        <Route
          path='/'
          element={<HomePage username={username} setUsername={setUsername} />}
        ></Route>
        <Route
          path='/savedKeebs'
          element={<SavedKeebsPage username={username} />}
        ></Route>
=======
        <Route path='/' element={<HomePage currentUser={currentUser} setUser={setUser}/>}></Route>
        <Route path='/savedKeebs' element={<SavedKeebsPage currentUser={currentUser} setUser={setUser}/>}></Route>
>>>>>>> 0ee11b98ab680274dc810f74fbe1b002152d9ca7
      </Routes>
    </div>
  );
};

export default App;
