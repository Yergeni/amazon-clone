import React from 'react';

import Header from './components/header/Header.component';
import Home from './components/home/Home.component';

import './App.css';

function App() {
  return (
    <div className="App">
      {/* Header */}
      <Header />
      {/* Home */}
      <Home />
    </div>
  );
}

export default App;
