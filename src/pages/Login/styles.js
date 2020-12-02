import styled from 'styled-components';
import SvgUri from 'react-native-svg-uri';
import { colors } from '../../styles';

import logo from '../../assets/logo.svg';
import edge from '../../assets/canto.svg';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.background};
  padding: 20px;
`;

export const Header = styled.View`
  padding-vertical: 20px;
  margin-bottom: 20px;
`;

export const Logo = styled(SvgUri).attrs({
  width: '150',
  height: '150',
  source: logo,
})``;

export const Edge = styled(SvgUri).attrs({
  width: '300',
  height: '180',
  source: edge,
})`
  position: absolute;
  top: 0;
  right: 0;
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

export const ForgotPassword = styled.TouchableOpacity`
  align-self: flex-end;
  margin-bottom: 10px;
`;

export const ForgotPasswordText = styled.Text`
  font-size: 15px;
  color: #fff;

  font-weight: 500;
`;

export const SignUp = styled.View`
  flex-direction: row;
`;

export const SignUpText = styled.Text`
  font-size: 15px;
  color: #fff;
  margin-bottom: 10px;
  font-weight: 500;
`;

export const SignUpLink = styled.TouchableOpacity``;

export const SignUpLinkText = styled.Text`
  font-size: 15px;
  color: #ccc;
  font-weight: 500;
  text-decoration: underline;
`;
