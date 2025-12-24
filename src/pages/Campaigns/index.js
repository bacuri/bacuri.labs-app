import { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
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

  const [campaignsList, setCampaignsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCampaigns = async () => {
      try {
        const campaigns = await getMyCampaigns(id);

        setCampaignsList(campaigns);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    getCampaigns();
  }, []);

  if (loading) {
    return (
      <Container center>
        <ActivityIndicator size="large" color="#fff" />
      </Container>
    );
  }

  return (
    <CampaignList
      data={campaignsList}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <CampaignCard onPress={() => navigation.navigate('CampaignDetail', { ...item })}>
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
