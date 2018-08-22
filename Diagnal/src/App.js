import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import { Provider } from 'react-redux'
import Home from "./Home/HomeComponent";
import configureStore from '../src/Redux/store'

import './App.css';

const store = configureStore()

class App extends Component {
  render() {
    return (
      <div className="App">
      <Switch>
        <Provider store={store}>
          <Route exact path="/" render={routeParams =>(
            <Home />
          )} />
        </Provider>
      </Switch>
    </div>
    );
  }
}

export default App;
