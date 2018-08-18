import React, { Component } from 'react';
import { Home } from "./Home/HomeComponent";
import { Route, Switch } from "react-router-dom";
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
      <Switch>
        <Route exact path="/" render={routeParams => <Home />} />
      </Switch>
    </div>
    );
  }
}

export default App;
