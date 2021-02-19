import styled from 'styled-components';

export const Header = styled.View`
  flex-direction: row;
`;

export const HeaderText = styled.View`
  flex: 3;
`;

export const Title = styled.Text`
  font-size: 24px;
  color: white;
  font-weight: bold;
  margin-bottom: 5px;
`;

export const TitleSecondary = styled.Text`
  font-size: 21px;
  color: white;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const Description = styled.Text`
  font-size: 18px;
  color: white;
  margin-bottom: 20px;
`;

export const NumberCard = styled.View`
  flex-direction: ${props => (props.row ? 'row' : 'column')};
  justify-content: ${props => (props.row ? 'space-between' : 'center')};
  background-color: #f9a61a;
  padding-vertical: 10px;
  padding-horizontal: 5px;
  align-items: center;
  margin-bottom: 10px;
  border-radius: 5px;
  elevation: 2;
`;

export const Number = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: white;
`;

export const Text = styled.Text`
  font-size: 12px;
  color: white;
  margin-bottom: 5px;
  text-align: center;
`;
