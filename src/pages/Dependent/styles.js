import styled from 'styled-components';
import { FontAwesome5 } from '@expo/vector-icons';
import { colors } from '../../styles';

export const Background = styled.View`
  flex: 1;
  background-color: ${colors.primary};
`;

export const Header = styled.View`
  padding-vertical: 40px;
  padding-horizontal: 20px;
`;

export const HeaderTitle = styled.Text`
  font-size: 36px;
  color: #000;
  font-weight: bold;
  margin-bottom: 5px;
`;

export const HeaderDescription = styled.Text`
  font-size: 20px;
  color: #000;
`;

export const Title = styled.Text`
  font-size: 26px;
  color: #fff;
  font-weight: bold;
  margin-left: 20px;
  margin-bottom: 30px;
`;

export const Footer = styled.View`
  flex: 1;
  background-color: ${colors.background};
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding-vertical: 30px;
`;

export const Card = styled.TouchableOpacity.attrs({
  activeOpacity: 0.4,
})`
  background-color: #161b1f;
  aspect-ratio: 1;
  border-radius: 15px;
  padding: 15px;
  margin-right: 10px;
  margin-horizontal: 5px;
  justify-content: space-around;
  align-items: flex-start;
`;

export const IconCard = styled.View`
  background-color: #fff;
  padding: 15px;
  border-radius: 10px;
  aspect-ratio: 1;
  justify-content: center;
  align-items: center;
`;

export const Icon = styled(FontAwesome5).attrs({
  size: 22,
  color: '#000',
})``;

export const CardTitle = styled.Text`
  color: #fff;
  font-size: 18px;
  font-weight: bold;
`;

export const CardDescription = styled.Text`
  color: #fff;
  font-size: 17px;
`;

export const ScrollView = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: {
    paddingHorizontal: 15,
    height: 270,
  },
})``;
