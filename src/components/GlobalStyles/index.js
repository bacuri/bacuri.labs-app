import styled from 'styled-components';
import { Picker } from '@react-native-picker/picker';

export const Container = styled.SafeAreaView`
  flex: 1;
  padding: 20px;

  ${props =>
    props.center &&
    `
    align-Items: center;
    justify-Content: center;
  `}

  ${props =>
    props.spaceBetween &&
    `
    justify-Content: space-between;
  `}
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

export const Label = styled.Text`
  font-size: 16px;
  color: #fff;
  font-weight: bold;
  text-transform: uppercase;
  margin-top: 10px;
`;

export const ErrorMessage = styled.Text`
  font-size: 15px;
  color: #ff2c2c;
  font-weight: 500;
`;

export const Select = styled(Picker)`
  background-color: #f9a61a;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  padding: 15px;
  margin-vertical: 5px;
  elevation: 3;
`;
