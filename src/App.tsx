import React from 'react';
import { User } from './App.types';
import './App.css';

type Props = {
  user: User;
};

function App({user}: Props) {
  return (
    <div className="App">
     <h1>{`User name is ${user.name}`}</h1>
     <h2>{`User age is ${user.age}`}</h2>
    </div>
  );
};

export default App;
