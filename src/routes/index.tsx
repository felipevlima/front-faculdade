import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Computer from '../pages/Computer/Computer';
import Smartphone from '../pages/Smartphone/Smartphone';
import Users from '../pages/Users/Users';
import { Container } from './Routes.styles';

function Routes() {
  return (
    <Container>
      <Switch>
        <Route path="/" exact component={() => <Redirect to="/computador" />} />
        <Route path="/computador" component={Computer} />
        <Route path="/celular" component={Smartphone} />
        <Route path="/users" component={Users} />
      </Switch>
    </Container>
  );
}

export default Routes;
