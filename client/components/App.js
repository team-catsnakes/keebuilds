import React from 'react';
// import bongocat from '../assets/bongocat.png';
import StartBuild from './StartBuild';
import SavedBuilds from './SavedBuilds';

import SavedBuildsButton from './SavedBuildsButton';
import '../scss/styles.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import SavedKeebsPage from './SavedKeebsPage';


const App = () => {

  const [currentUser, setUser] = React.useState({
    username: '',
    password: '',
  });

  return (
    <div>
      <Routes>
        <Route path='/' element={<HomePage currentUser={currentUser} setUser={setUser}/>}></Route>
        <Route path='/savedKeebs' element={<SavedKeebsPage currentUser={currentUser} setUser={setUser}/>}></Route>
      </Routes>
    </div>
  );
};

export default App;
