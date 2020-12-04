import styled from 'styled-components';
import { colors } from '../../styles';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.background};
  padding: 20px;
`;

export const Input = styled.TextInput.attrs({
  placeholderTextColor: '#fff',
})`
  background-color: #f9a61a;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  padding: 15px;
  margin-vertical: 5px;
  elevation: 3;
`;

export const ErrorMessage = styled.Text`
  font-size: 15px;
  color: #fff;
  margin-bottom: 10px;
  font-weight: 500;
`;
