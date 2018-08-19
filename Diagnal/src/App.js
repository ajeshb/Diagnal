import React, { Component } from 'react';
import Home from "./Home/HomeComponent";
import { Route, Switch } from "react-router-dom";
import { Provider } from 'react-redux'
import configureStore from '../src/Redux/store'

import logo from './logo.svg';
import './App.css';

const store = configureStore()

class App extends Component {
  render() {
    return (
      <div className="App">
      <Switch>
        <Route exact path="/" render={routeParams =>(
          <Provider store={store}>
            <Home />
          </Provider>
          )} />
      </Switch>
    </div>
    );
  }
}

export default App;
