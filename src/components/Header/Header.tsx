import React from 'react';
import { NavLink } from 'react-router-dom';

import { Container, Content, Pages } from './Header.styles';

const Header = () => {
  return (
    <Container>
      <Content>
        <div>
          <nav>
            <h1>Faculdade</h1>
          </nav>
          <Pages>
            <NavLink to="/computador">Computador</NavLink>
            <NavLink to="/celular">Celular</NavLink>
            <NavLink to="/users">Usuário</NavLink>
          </Pages>
        </div>
      </Content>
    </Container>
  );
};

export default Header;
