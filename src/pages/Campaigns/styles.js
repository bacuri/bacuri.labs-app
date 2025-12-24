import styled from 'styled-components';

export const CampaignList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    padding: 20,
  },
})``;

export const CampaignCard = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: #f9a61a;
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 5px;
`;

export const CampaignCardTitle = styled.Text`
  font-size: 17px;
  color: white;
  font-weight: bold;
`;

export const CampaignCardDescription = styled.Text`
  font-size: 15px;
  color: white;
`;
