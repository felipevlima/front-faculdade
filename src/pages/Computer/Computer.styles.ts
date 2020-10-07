import styled from 'styled-components';

export const AddBox = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 25px;
`;

export const ComputerForm = styled.form`
  padding: 25px;
  border-radius: 15px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2);
  grid-row-gap: 25px;
  grid-column-gap: 25px;
  background: #fafafa;
`;

export const EmptyList = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 70vh;

  color: #333;
  font-size: 1.6rem;
`;
