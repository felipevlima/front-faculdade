import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  Collapse,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TextField,
  Snackbar,
} from '@material-ui/core';
import { Edit, Delete } from '@material-ui/icons';
import MuiAlert from '@material-ui/lab/Alert';
import Section from '../../components/Section/Section';
import { EmptyList, ComputerForm, AddBox, Name } from './Computer.styles';
import api from '../../services/api';

interface ComputerTypes {
  _id: string;
  model: string;
  ram: number;
  graphicCard: string;
  memory: string;
  processor: string;
}

const Alert = (props: any) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const Computer: React.FC = () => {
  const { handleSubmit, register, setValue } = useForm();
  const [computers, setComputers] = useState<ComputerTypes[]>([]);
  const [opened, setOpened] = useState(false);
  const [update, setUpdate] = useState(false);
  const [upId, setUpId] = useState('');
  const [open, setOpen] = useState(false);

  async function handleAdd(formFields: any) {
    if (!update) {
      await api
        .post('/computers', formFields)
        .then((response) => {
          const newComputer = response.data;
          setComputers([...computers, newComputer]);
          setOpened(false);
        })
        .catch((err) => {
          throw new Error(err);
        });
    }

    await api
      .put(`/computers/${upId}`, formFields)
      .then((response) => {
        const upCheck = computers.filter(
          (computer: ComputerTypes) => computer._id != upId);
        const upComputer = response.data;
        const updating = upCheck.concat(upComputer);
        setComputers(updating);
        setUpdate(false);
        setOpened(false);
      })
      .catch(() => {
        setOpen(!open);
      });
  }

  async function handleDelete(id: string) {
    await api
      .delete(`/computers/${id}`)
      .then(() => {
        const newComputers = computers.filter(
          (computer: ComputerTypes) => computer._id !== id
        );
        setComputers(newComputers);
      })
      .catch(() => {
        setOpen(!open);
      });
  }

  async function handleUpdate(id: string) {
    setOpened(true);
    const uComputer = await computers.find((computer) => computer._id === id);
    setValue('model', uComputer?.model);
    setValue('ram', uComputer?.ram);
    setValue('graphicCard', uComputer?.graphicCard);
    setValue('memory', uComputer?.memory);
    setValue('processor', uComputer?.processor);
    setUpId(id);
    setUpdate(true);
  }

  const handleClose = () => {
    setOpen(!open);
  };

  useEffect(() => {
    (async () => {
      const { data } = await api.get('/computers');
      return setComputers(data);
    })();
  }, []);

  return (
    <Section>
    <Name>Computer List</Name>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Alert severity="error">Erro!</Alert>
      </Snackbar>
      <AddBox>
        <Button
          onClick={() => setOpened(!opened)}
          variant="contained"
          color="primary"
        >
          Add Computer
        </Button>
      </AddBox>
      <Collapse in={opened} timeout="auto" unmountOnExit>
        <ComputerForm onSubmit={handleSubmit(handleAdd)}>
          <TextField
            name="model"
            label="Model"
            variant="outlined"
            inputRef={register}
          />
          <TextField
            name="ram"
            label="Ram"
            variant="outlined"
            inputRef={register}
          />
          <TextField
            name="graphicCard"
            label="Graphic Card"
            variant="outlined"
            inputRef={register}
          />
          <TextField
            name="memory"
            label="Memory"
            variant="outlined"
            inputRef={register}
          />
          <TextField
            name="processor"
            label="Processor"
            variant="outlined"
            inputRef={register}
          />
          <Button type="submit" variant="contained" color="primary">
            {!update ? 'Create' : 'Update'}
          </Button>
        </ComputerForm>
      </Collapse>

      {computers.length > 0 ? (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Model</TableCell>
                <TableCell>Ram</TableCell>
                <TableCell>Graphic Card</TableCell>
                <TableCell>Memory</TableCell>
                <TableCell>Processor</TableCell>
                <TableCell>Options</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {computers.map((computer: ComputerTypes) => (
                <TableRow key={computer._id}>
                  <TableCell component="th" scope="row">
                    {computer.model}
                  </TableCell>
                  <TableCell align="left">{computer.ram}</TableCell>
                  <TableCell align="left">{computer.graphicCard}</TableCell>
                  <TableCell align="left">{computer.memory}</TableCell>
                  <TableCell align="left">{computer.processor}</TableCell>
                  <TableCell align="left">
                    <Button
                      color="primary"
                      onClick={() => handleUpdate(computer._id)}
                    >
                      <Edit />
                    </Button>
                    <Button
                      color="secondary"
                      onClick={() => handleDelete(computer._id)}
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
        <EmptyList>Nothing here ...</EmptyList>
      )}
    </Section>
  );
};

export default Computer;
