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
  Snackbar,
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { Edit, Delete } from '@material-ui/icons';
import Section from '../../components/Section/Section';
import { Form, Title, ButtonDiv, NotFoundText } from './Smartphone.styles';
import api from '../../services/api';

export interface SmartphoneInterface {
  _id: string;
  name: string;
  so: string;
  processor: string;
  screen: number;
  mark: string;
  memoryRam: number;
  memory: number;
}

const Alert = (props: any) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const Smartphone: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [smarts, setSmarts] = useState<SmartphoneInterface[]>([]);
  const { handleSubmit, register, setValue } = useForm();
  const [open, setOpen] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [updateId, setUpdateId] = useState('');


  const deleteSmart = async (id: string) => {
    await api
      .delete(`/smartphone/${id}`)
      .then(() => {
        const results = smarts.filter(
          (smartphone: SmartphoneInterface) => smartphone._id !== id
        );

        setSmarts(results);
      })
      .catch(() => {
        setOpen(!open);
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
    setUpdateId(id);
    setUpdated(true);
  };

  const handleClose = () => {
    setOpen(!open);
  };

  const onSubmit = async (formFields: any) => {
    if(updated){
      await api
      .put(`/smartphone/${updateId}`, formFields)
      .then((response) => {
        const updateSmart = response.data;
        const smartphoneWithoutDelete = smarts.filter(
          (smartphone: SmartphoneInterface) => smartphone._id !== updateId
        );
        const newSmartsArray = smartphoneWithoutDelete.concat(updateSmart);
        setSmarts(newSmartsArray);
        setUpdated(false);
        return setVisible(false);
      })
      .catch(() => {
        return setOpen(!open);
      });
    }
    await api
      .post('/smartphone', formFields)
      .then((response) => {
        const result = response.data;
        setSmarts([...smarts, result]);
        setVisible(false);
      })
      .catch(() => {
        setOpen(!open);
        setVisible(false);
      });
  };

  useEffect(() => {
    async function loadSmartphones() {
      const { data } = await api.get('/smartphone');
      return setSmarts(data);
    }
    loadSmartphones();
  }, []);

  return (
    <Section>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Alert severity="error">Erro ao {!updated ? 'Cadastrar Smartphone' : 'Atualizar Smartphone'}!</Alert>
      </Snackbar>
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
              {!updated ? 'Cadastrar' : 'Atualizar'}
            </Button>

            <Button
              variant="outlined"
              color="primary"
              onClick={() => setVisible(false)}
              style={{ maxWidth: 300, margin: 5 }}
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
                  <TableCell component="th" scope="row">
                    {smartphone.name}
                  </TableCell>
                  <TableCell align="left">{smartphone.so}</TableCell>
                  <TableCell align="left">{smartphone.processor}</TableCell>
                  <TableCell align="left">
                    {smartphone.screen} Polegadas
                  </TableCell>
                  <TableCell align="left">{smartphone.mark}</TableCell>
                  <TableCell align="left">{smartphone.memoryRam} GB</TableCell>
                  <TableCell align="left">{smartphone.memory} GB</TableCell>
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

      <Button 
        variant="outlined" 
        color="primary" 
        onClick={() => window.location.reload(false)}
      >
        Atualizar
      </Button>

    </Section>
  );
};

export default Smartphone;
