import styled from 'styled-components';

export const Error = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #fff;
  text-align: center;
`;

export const VaccineList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    padding: 20,
  },
})``;

export const Loading = styled.ActivityIndicator.attrs({
  color: '#fff',
  size: 64,
})``;
