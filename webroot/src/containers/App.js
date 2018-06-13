import React, {Component} from 'react';
import {BrowserRouter, Route} from "react-router-dom";
import {Switch} from "react-router";
import Home from '../containers/Home';

class AppContainer extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home}/>
        </Switch>
      </BrowserRouter>
    )
  }
}

export default AppContainer;