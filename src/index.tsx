import React, {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

import App from './App';
import { User } from './App.types';

const user: User = {
  id: 1,
  name: "Harry",
  age: 34,
};

const rootElement = document.getElementById('root');
const root = createRoot(rootElement as HTMLElement)
root.render(
  <StrictMode>
    <App user={user}/>
  </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
