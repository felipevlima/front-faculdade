import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import {
  Button,
  /* FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  Radio,
  RadioGroup,
  Select,
  TextField, */
} from '@material-ui/core';

import Section from '../../components/Section/Section';
import { Container, Name } from './Computer.styles';
import api from '../../services/api';

const Computer = () => {
  const [computers, setComputers] = useState<any[]>([]);

  useEffect(() => {
    api.get('/computers').then((response) => {
      setComputers(response.data);
    });
  }, []);

  function handleAddComputer() {
    console.log('funcao');
  }

  return (
    <Section>
      <Name>Computer List</Name>

      <Button onClick={handleAddComputer}>Add computer</Button>

      <Container>
        {computers.map((computer) => (
          <>
            <div>{computer.model}</div>
            <div>{computer.processor}</div>
          </>
        ))}
      </Container>
    </Section>
  );
};

export default Computer;
