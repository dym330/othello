import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// containers
import { Homes } from './containers/Homes.jsx'
import { Othellos } from './containers/Othellos.jsx'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Homes />
        </Route>
        <Route exact path="/othello">
          <Othellos />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
