import React from 'react';
// import logo from './logo.svg';
import './App.css';
import EasyMailing from './components/EasyMailing';

function App() {
  return (
    <div className="App">
    <EasyMailing baseUrl='http://localhost:3333' path='mail'>

    </EasyMailing>
    </div>
  );
}

export default App;
