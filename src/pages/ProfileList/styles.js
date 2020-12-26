import styled from 'styled-components';
import SvgUri from 'react-native-svg-uri';
import { FontAwesome5 } from '@expo/vector-icons';
import { colors } from '../../styles';

import icon from '../../assets/icon.svg';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.background};
  padding: 20px;
`;

export const Bear = styled(SvgUri).attrs({
  width: '50',
  height: '50',
  source: icon,
})``;

export const Plus = styled(FontAwesome5).attrs({
  name: 'plus',
  size: 32,
  color: '#fff',
})``;

export const Title = styled.Text`
  font-size: 29px;
  color: #fff;
  margin-bottom: 20px;
  text-align: center;
  font-weight: bold;
`;

export const ProfileCard = styled.TouchableOpacity.attrs({
  activeOpacity: 0.5,
})`
  flex-grow: 1;
  flex-basis: 0;
  margin: 4px;
`;

export const ProfileCardImage = styled.View`
  flex: 1;
  aspect-ratio: 1;
  background-color: ${props =>
    props.empty || props.transparent ? 'transparent' : '#f2f2f2'};
  border-radius: 24px;
  align-items: center;
  justify-content: center;
  border-width: ${props => (props.transparent ? '5px' : '0px')};
  border-color: white;
  overflow: hidden;
`;

export const ProfileCardText = styled.Text`
  font-size: 15px;
  color: #fff;
  text-align: center;
`;

export const Logout = styled.TouchableOpacity``;
export const LogoutText = styled.Text`
  color: #fff;
  font-size: 20px;
  font-weight: bold;
`;
