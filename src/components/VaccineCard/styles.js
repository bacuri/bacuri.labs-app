import styled from 'styled-components';

export const Card = styled.View`
  background-color: #f2f2f2;
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
  background-color: red;
  border-radius: 5px;
  padding: 2px;
`;

export const BadgeText = styled.Text`
  color: white;
`;

export const CardTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  flex: 1;
`;

export const CardDescription = styled.Text`
  font-size: 15px;
  margin-bottom: 5px;
`;
