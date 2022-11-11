import styled from 'styled-components';
import { Form as FormikForm, ErrorMessage as Error } from 'formik';

export const Form = styled(FormikForm)`
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  padding: 12px;
`;
export const ErrorMessage = styled(Error)`
  color: red;
  font-size: 13px;
`;
export const Button = styled.button`
  width: 150px;
  font-size: 18px;
  margin-left: 10px;
`;
export const Input = styled.input`
  display: block;
  padding: 10px;
  border-radius: 4px;
  font-size: 22px;
`;
export const Label = styled.label`
  display: block;
  padding: 10px;
  border-radius: 4px;
  font-size: 22px;
`;
