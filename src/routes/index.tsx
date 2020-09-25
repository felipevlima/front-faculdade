import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Computer from '../pages/Computer/Computer';
import { Container } from './Routes.styles';

function Routes() {
  return (
    <Container>
      <Switch>
        <Route path="/" exact component={Computer} />
        <Route path="/computador" component={Computer} />
      </Switch>
    </Container>
  );
}

export default Routes;
