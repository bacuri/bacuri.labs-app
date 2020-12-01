import styled from 'styled-components';
import { RectButton } from 'react-native-gesture-handler';

export const ButtonBody = styled(RectButton)`
  width: 100%;
  background-color: ${props =>
    !props.enabled ? '#ddd' : props.color ? props.color : '#FBFBFB'};
  align-items: center;
  justify-content: center;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 10px;
  elevation: 3;
`;

export const ButtonText = styled.Text`
  font-size: 16px;
  color: #5a4646;
  font-weight: bold;
`;
