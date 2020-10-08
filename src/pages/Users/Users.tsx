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
import MuiAlert from '@material-ui/lab/Alert';
import { Edit, Delete } from '@material-ui/icons';
import api from '../../services/api';
import Section from '../../components/Section/Section';
import { AddUserDiv, UserForm, NotFoundText } from './Users.styles';
import { UserInterface } from './Users.types';

const Alert = (props: any) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const Users: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  const [users, setUsers] = useState<UserInterface[]>([]);
  const { handleSubmit, register, setValue } = useForm();
  const [open, setOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [updateId, setUpdateId] = useState('');

  const onSubmit = async (formFields: any) => {
    if (!isUpdate) {
      await api
        .post('/users', formFields)
        .then((response) => {
          const newUser = response.data;
          setUsers([...users, newUser]);
          return setExpanded(false);
        })
        .catch(() => {
          return setOpen(!open);
        });
    }
    await api
      .put(`/users/${updateId}`, formFields)
      .then((response) => {
        const updateUser = response.data;
        const userWithoutDelete = users.filter(
          (user: UserInterface) => user._id !== updateId
        );
        const newUsersArray = userWithoutDelete.concat(updateUser);
        setUsers(newUsersArray);
        setIsUpdate(false);
        return setExpanded(false);
      })
      .catch(() => {
        return setOpen(!open);
      });
  };

  const deleteUser = async (id: string) => {
    await api
      .delete(`/users/${id}`)
      .then(() => {
        const newUsers = users.filter((user: UserInterface) => user._id !== id);
        setUsers(newUsers);
      })
      .catch(() => {
        setOpen(!open);
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
    setUpdateId(id);
    setIsUpdate(true);
  };

  const handleClose = () => {
    setOpen(!open);
  };

  useEffect(() => {
    (async () => {
      const { data } = await api.get('/users');
      return setUsers(data);
    })();
  }, []);

  return (
    <Section>
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
        <UserForm onSubmit={handleSubmit((data) => onSubmit(data))}>
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
            {!isUpdate ? 'Criar usuario' : 'Atualizar usuário'}
          </Button>
        </UserForm>
      </Collapse>
      {users.length > 0 ? (
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
                <TableRow key={user.email}>
                  <TableCell component="th" scope="row">
                    {user.name}
                  </TableCell>
                  <TableCell align="left">{user.email}</TableCell>
                  <TableCell align="left">{user.cellphone}</TableCell>
                  <TableCell align="left">{user.age}</TableCell>
                  <TableCell align="left">{user.cep}</TableCell>
                  <TableCell align="left">
                    <Button
                      color="primary"
                      onClick={() => updateUser(user._id)}
                    >
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
      ) : (
        <NotFoundText>Nenhum usuario encontrado! :( </NotFoundText>
      )}
    </Section>
  );
};

export default Users;
