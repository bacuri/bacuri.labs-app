import styled from 'styled-components';

export const Header = styled.View`
  padding-vertical: 20px;
  margin-bottom: 20px;
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
