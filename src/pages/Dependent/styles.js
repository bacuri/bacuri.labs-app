import styled from 'styled-components';

export const Header = styled.View``;

export const Title = styled.Text`
  font-size: 22px;
  color: #fff;
  font-weight: bold;
  margin-left: 20px;
  margin-bottom: 10px;
`;

export const Footer = styled.View`
  height: 140px;
`;

export const Card = styled.TouchableOpacity`
  border-radius: 15px;
  border-width: 2px;
  border-color: #fff;
  padding: 15px;
  /* margin-right: 10px; */
  margin-horizontal: 5px;
  justify-content: space-between;
`;

export const Icon = styled.View``;

export const CardTitle = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`;

export const ScrollView = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: {
    paddingHorizontal: 15,
  },
})``;
