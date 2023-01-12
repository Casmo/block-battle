import './App.css';
import React, { useState } from 'react';
import Menu from './Components/Menu';
import Game from './Components/Game';
import background from './assets/background.png';

const App = () => {
  
  const [ page, setPage ] = useState('menu');
  const [ settings, setSettings ] = useState({});

  const changePage = (page, settings) => {
    settings = settings || {};
    setSettings(settings);
    setPage(page);
  }

  return (
    <div className="h-screen w-screen bg-cover" style={{backgroundImage: `url(${background})`}}>
      { page === 'menu' && (
        <Menu changePage = {changePage}></Menu>
      ) }
      { page === 'game' && (
        <Game changePage = {changePage} settings={settings}></Game>
      ) }
    </div>
  );
}

export default App;
