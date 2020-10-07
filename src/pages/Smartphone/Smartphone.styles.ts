import styled from 'styled-components';

export const Form = styled.form`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2);
  grid-row-gap: 10px;
  grid-column-gap: 25px;
  background: #f2f2f2;
  padding: 2.5%;
  border-radius: 10px;
`;

export const Title = styled.h1`
  font-size: 28px;
  text-align: center;
  margin-bottom: 30px;
  border-bottom-color: #000;
  border-bottom-width: 1;
  border-bottom-style: solid;
  padding-bottom: 5px;
  margin: 0 100px;
`;

export const ButtonDiv = styled.div`
  margin: 5px;
  justify-content: space-between;
  align-items: center;
`;

export const NotFoundText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 70vh;

  color: #333;
  font-size: 1.6rem;
`;
