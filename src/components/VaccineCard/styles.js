import styled from 'styled-components';

export const Card = styled.View`
  background-color: #161b1f;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
`;

export const CardHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`;

export const Badge = styled.View`
  background-color: ${props => (props.color ? props.color : 'green')};
  border-radius: 5px;
  padding: 2px;
  aspect-ratio: 1;
  min-width: 20px;
  align-items: center;
  justify-content: center;
  margin-left: 3px;
`;

export const CardTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  flex: 1;
  color: #f2f2f2;
`;

export const CardDescription = styled.Text`
  font-size: 15px;
  margin-bottom: 5px;
  color: #f2f2f2;
`;

export const CollapseButton = styled.TouchableOpacity`
  align-self: center;
`;
