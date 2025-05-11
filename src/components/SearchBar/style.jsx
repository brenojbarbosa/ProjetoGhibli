import styled from 'styled-components';

export const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 300px; 
`;

export const Input = styled.input`
  background-color: #ffffff;
  width: 100%; 
  padding-left: 30px; 
  height: 40px;
  border-radius: 4px;
  border: 1px solid #ced4da;
`;

export const Icon = styled.i`
  position: absolute;
  top: 50%;
  left: 10px; 
  transform: translateY(-50%);
  color: #6c757d;
`;
