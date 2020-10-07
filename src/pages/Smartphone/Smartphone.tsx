import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Button,
  Collapse,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@material-ui/core';
import { Edit, Delete } from '@material-ui/icons';
import Section from '../../components/Section/Section';
import { Form, Title, ButtonDiv, NotFoundText } from './Smartphone.styles';
import api from '../../services/api';

export interface SmartphoneInterface{
  _id: string;
  name: string;
  so: string;
  processor: string;
  screen: number;
  mark: string;
  memoryRam: number;
  memory: number;
}

const Smartphone: React.FC = () => {

  const [visible, setVisible] = useState(false);
  const [smarts, setSmarts] = useState<SmartphoneInterface[]>([]);
  const { handleSubmit, register, setValue } = useForm();

  const deleteSmart = async (id: string) => {
    await api.delete(`/smartphone/${id}`).then(()=>{
      const results = smarts.filter((smartphone: SmartphoneInterface) => smartphone._id !== id);

      setSmarts(results);
    })
    .catch((err) => {
      throw new Error(err);
    });
  };

  const updateSmart = async (id: string) => {
    setVisible(true);
    const findSmartphone = await smarts.find((smart) => smart._id === id);
    setValue('name', findSmartphone?.name);
    setValue('so', findSmartphone?.so);
    setValue('processor', findSmartphone?.processor);
    setValue('screen', findSmartphone?.screen);
    setValue('mark', findSmartphone?.mark);
    setValue('memoryRam', findSmartphone?.memoryRam);
    setValue('memory', findSmartphone?.memory);
  };

  const onSubmit = async (formFields: any) => {
    console.log(formFields);

    await api
      .post('/smartphone', formFields)
      .then((response) => {
        const result = response.data;
        setSmarts([...smarts, result]);
        setVisible(false);
      })
      .catch((e) => {
        alert('Erro ao cadastrar smartphone');
        setVisible(false);
        console.log(e);
      });
  };

  useEffect(()=>{
    async function loadSmartphones(){
      const {data} = await api.get('/smartphone');
      return setSmarts(data);
    };

    loadSmartphones();
  },[]);
  
  return (
    <Section>
      <Title>Lista de Smartphones</Title>

      <Collapse in={visible} timeout="auto" unmountOnExit>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            name="name"
            label="Nome"
            variant="outlined"
            inputRef={register}
          />
          <TextField
            name="so"
            label="Sistema Operacional"
            variant="outlined"
            inputRef={register}
          />

          <TextField
            name="processor"
            label="Processador"
            variant="outlined"
            inputRef={register}
          />

          <TextField
            name="screen"
            label="Tela"
            variant="outlined"
            inputRef={register}
          />

          <TextField
            name="mark"
            label="Marca"
            variant="outlined"
            inputRef={register}
          />

          <TextField
            name="memoryRam"
            label="Memória RAM"
            variant="outlined"
            type="number"
            inputRef={register}
          />

          <TextField
            name="memory"
            label="Memória"
            variant="outlined"
            type="number"
            inputRef={register}
          />

          <ButtonDiv>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              style={{ maxWidth: 300, margin: 5 }}
            >
              Cadastrar
            </Button>

            <Button
              variant="outlined"
              color="primary"
              onClick={() => setVisible(false)}
              style={{ maxWidth: 300,  margin: 5  }}
            >
              Voltar
            </Button>
          </ButtonDiv>
        </Form>

      </Collapse>

      {smarts.length > 0 ? (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell>Sistema Operacional</TableCell>
                <TableCell>Processador</TableCell>
                <TableCell>Tela</TableCell>
                <TableCell>Marca</TableCell>
                <TableCell>Memória RAM</TableCell>
                <TableCell>Memória</TableCell>
                <TableCell align="center">Edit | Remove</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {smarts.map((smartphone: SmartphoneInterface) => (
                <TableRow key={smartphone._id}>
                  <TableCell component="th" scope="row" >{smartphone.name}</TableCell>
                  <TableCell align="left" >{smartphone.so}</TableCell>
                  <TableCell align="left" >{smartphone.processor}</TableCell>
                  <TableCell align="left" >{smartphone.screen} Polegadas</TableCell>
                  <TableCell align="left" >{smartphone.mark}</TableCell>
                  <TableCell align="left" >{smartphone.memoryRam} GB</TableCell>
                  <TableCell align="left" >{smartphone.memory} GB</TableCell>
                  <TableCell align="center">
                    <Button
                      color="primary"
                      onClick={() => updateSmart(smartphone._id)}
                    >
                      <Edit />
                    </Button>
                    <Button
                      color="secondary"
                      onClick={() => deleteSmart(smartphone._id)}
                    >
                      <Delete />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <NotFoundText> Não há smartphones cadastrados! </NotFoundText>
      )}

      <Button
        variant="contained"
        color="primary"
        onClick={() => setVisible(!visible)}
        style={{ margin: 5 }}
      >
        Adicionar Smartphone
      </Button>

    </Section>
  );
};

export default Smartphone;
