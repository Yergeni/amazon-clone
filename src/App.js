import React from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Header from './components/header/Header.component';
import Home from './components/home/Home.component';
import Checkout from './components/checkout/Checkout.component';

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Header */}
        <Header />
        <Switch>
          {/* Home */}
          <Route exact path='/'>
            <Home />
          </Route>
          {/* Checkout */}
          <Route exact path='/checkout'>
            <Checkout />
          </Route>
          {/* Not Found */}
          <Route>
            <h1>Not found Page</h1>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
