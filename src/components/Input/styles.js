import styled, { css } from 'styled-components';
import { TextInput } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';

const input = css`
  background-color: #f9a61a;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  padding: 15px;
  margin-vertical: 5px;
  elevation: 3;
`;

export const InputNormal = styled(TextInput).attrs({
  placeholderTextColor: '#fff',
})`
  ${input}
`;

export const InputMask = styled(TextInputMask).attrs({
  placeholderTextColor: '#fff',
})`
  ${input}
`;
