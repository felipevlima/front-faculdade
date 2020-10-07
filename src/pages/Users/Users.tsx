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
} from '@material-ui/core';
import { Edit, Delete } from '@material-ui/icons';
import api from '../../services/api';
import Section from '../../components/Section/Section';
import { AddUserDiv, UserForm } from './Users.styles';

interface UserInterface {
  _id: string;
  name: string;
  email: string;
  age: string;
  cellphone: string;
  cep: string;
}

const Users: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  const [users, setUsers] = useState<UserInterface[]>([]);
  const { handleSubmit, register, setValue } = useForm();

  const onSubmit = async (formFields: any) => {
    await api
      .post('/users', formFields)
      .then((response) => {
        const newUser = response.data;
        setUsers([...users, newUser]);
        setExpanded(false);
      })
      .catch((e) => {
        throw new Error(e);
      });
  };

  const deleteUser = async (id: string) => {
    await api
      .delete(`/users/${id}`)
      .then(() => {
        const newUsers = users.filter((user: UserInterface) => user._id !== id);
        setUsers(newUsers);
      })
      .catch((e) => {
        throw new Error(e);
      });
  };

  const updateUser = async (id: string) => {
    setExpanded(true);
    const findUser = await users.find((user) => user._id === id);
    setValue('name', findUser?.name);
    setValue('email', findUser?.email);
    setValue('cellphone', findUser?.cellphone);
    setValue('age', findUser?.age);
    setValue('cep', findUser?.cep);
  };

  useEffect(() => {
    (async () => {
      const { data } = await api.get('/users');
      return setUsers(data);
    })();
  }, []);

  return (
    <Section>
      <AddUserDiv>
        <Button
          onClick={() => setExpanded(!expanded)}
          variant="contained"
          color="primary"
        >
          Adicionar usuário
        </Button>
      </AddUserDiv>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <UserForm onSubmit={handleSubmit(onSubmit)}>
          <TextField
            name="name"
            label="Nome"
            variant="outlined"
            inputRef={register}
          />
          <TextField
            name="email"
            label="E-mail"
            variant="outlined"
            inputRef={register}
          />
          <TextField
            name="cellphone"
            label="Celular"
            variant="outlined"
            inputRef={register}
          />
          <TextField
            name="age"
            label="Idade"
            variant="outlined"
            inputRef={register}
          />
          <TextField
            type="number"
            name="cep"
            label="CEP"
            variant="outlined"
            inputRef={register}
          />
          <Button type="submit" variant="contained" color="primary">
            Criar usuario
          </Button>
        </UserForm>
      </Collapse>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>E-mail</TableCell>
              <TableCell>Celular</TableCell>
              <TableCell>Idade</TableCell>
              <TableCell>CEP</TableCell>
              <TableCell>Opções</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user: UserInterface) => (
              <TableRow key={user._id}>
                <TableCell component="th" scope="row">
                  {user.name}
                </TableCell>
                <TableCell align="left">{user.email}</TableCell>
                <TableCell align="left">{user.cellphone}</TableCell>
                <TableCell align="left">{user.age}</TableCell>
                <TableCell align="left">{user.cep}</TableCell>
                <TableCell align="left">
                  <Button color="primary" onClick={() => updateUser(user._id)}>
                    <Edit />
                  </Button>
                  <Button
                    color="secondary"
                    onClick={() => deleteUser(user._id)}
                  >
                    <Delete />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Section>
  );
};

export default Users;
