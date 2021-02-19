import styled from 'styled-components';

const opacity = 'rgba(0, 0, 0, 0.6)';

export const Layer = styled.View`
  flex: 1;
  background-color: ${opacity};
  align-items: center;
  justify-content: center;
`;

export const LayerCenter = styled.View`
  flex: 1.5;
  flex-direction: row;
`;

export const Focused = styled.View`
  flex: 10;
`;

export const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;
