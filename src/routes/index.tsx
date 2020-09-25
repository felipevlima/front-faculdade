import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Computer from '../pages/Computer/Computer';

function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Computer} />
      <Route path="/computador" component={Computer} />
    </Switch>
  );
}

export default Routes;
