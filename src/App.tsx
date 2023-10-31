import React from 'react';
import { User } from './App.types';
import './App.css';

type Props = {
  user: User;
};

function App({user}: Props) {
  return (
    <div className="App" id='app'>
    </div>
  );
};

export default App;
