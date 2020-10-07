import styled from 'styled-components';

export const AddUserDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 25px;
`;

export const UserForm = styled.form`
  padding: 25px;
  border-radius: 15px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2);
  grid-row-gap: 25px;
  grid-column-gap: 25px;
  background: #fafafa;
`;
