import { View, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import useSWR from 'swr';
import { getMyCampaigns } from '../../services/campaignService';

import { Container } from '../../components/GlobalStyles';
import {
  CampaignCard,
  CampaignCardTitle,
  CampaignCardDescription,
  CampaignList,
} from './styles';

const Campaigns = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const { id } = route.params;

  const { data, isLoading } = useSWR(['campaigns', id], () => getMyCampaigns(id), {
    onError: (err) => console.log(err),
  });
  const campaignsList = data || [];

  if (isLoading) {
    return (
      <Container center>
        <ActivityIndicator size="large" color="#fff" />
      </Container>
    );
  }

  return (
    <CampaignList
      data={campaignsList}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <CampaignCard
          onPress={() => navigation.navigate('CampaignDetail', { ...item })}
        >
          <View>
            <CampaignCardTitle>{item.title}</CampaignCardTitle>
            <CampaignCardDescription>
              {item.description}
            </CampaignCardDescription>
          </View>
          <FontAwesome5 name="arrow-right" color="#f2f2f2" size={17} />
        </CampaignCard>
      )}
    />
  );
};

export default Campaigns;
