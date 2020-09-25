import React from 'react';
import Section from '../../components/Section/Section';
import { Button, FormControl, FormControlLabel, FormLabel, InputLabel, Radio, RadioGroup, Select, TextField } from '@material-ui/core';
import { Form, Title } from './Smartphone.styles';

// import { Container } from './styles';

const Smartphone: React.FC = () => {
  return (
    <Section>
      <Title>Lista de Smartphones</Title>
      <Form>
        <TextField
          id="name" label="Nome" variant="outlined" fullWidth style={{marginBottom: 20}}
        />

        <FormControl component="fieldset" fullWidth style={{marginBottom: 15}}>
          <FormLabel component="legend">Sistema Operacional</FormLabel>
          <RadioGroup aria-label="so" name="so" row>
            <FormControlLabel value="Android" control={<Radio color="primary"/>} label="Android" />
            <FormControlLabel value="IOS" control={<Radio color="primary" />} label="IOS" />
            <FormControlLabel value="Windows Phone" control={<Radio color="primary" />} label="Windows Phone" />
          </RadioGroup>
        </FormControl>

        <TextField
          id="process" label="Processador" variant="outlined" fullWidth style={{marginBottom: 20}}
        />

        <TextField
          id="screen" label="Tela" variant="outlined" fullWidth style={{marginBottom: 20}}
        />
        <FormControl component="fieldset" fullWidth style={{marginBottom: 15}}>
          <FormLabel component="legend">Memória RAM</FormLabel>
          <RadioGroup aria-label="memoryRam" name="gender1" row>
            <FormControlLabel value="2" control={<Radio color="primary"/>} label="2GB" />
            <FormControlLabel value="3" control={<Radio color="primary" />} label="3GB" />
            <FormControlLabel value="4" control={<Radio color="primary" />} label="4GB" />
            <FormControlLabel value="6" control={<Radio color="primary" />} label="6GB" />
            <FormControlLabel value="8" control={<Radio color="primary" />} label="8GB" />
          </RadioGroup>
        </FormControl>

        <FormControl variant="outlined" fullWidth style={{marginBottom: 20}}>
          <InputLabel htmlFor="memory">Memória</InputLabel>
          <Select
            native
            label="Memória"
            inputProps={{
              name: 'memory',
              id: 'memory',
            }}
          >
            <option aria-label="None" value="" />
            <option value={8}>8GB</option>
            <option value={16}>16GB</option>
            <option value={32}>32GB</option>
            <option value={64}>64GB</option>
            <option value={128}>128GB</option>
            <option value={25}>256GB</option>
          </Select>
        </FormControl>

        <Button variant="contained" color="primary" onClick={() => { alert('Pressed') }} style={{marginRight: 5}}>Cadastrar</Button>
        <Button variant="outlined" color="primary" onClick={() => { alert('Pressed') }} style={{marginLeft: 5}}>Voltar</Button>
      </Form>
    </Section>
  );
};

export default Smartphone;
