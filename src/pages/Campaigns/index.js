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
    <Container>
      {campaignsList.map(campaign => (
        <CampaignCard
          key={String(campaign.id)}
          onPress={() => navigation.navigate('CampaignDetail', { ...campaign })}
        >
          <View>
            <CampaignCardTitle>{campaign.title}</CampaignCardTitle>
            <CampaignCardDescription>
              {campaign.description}
            </CampaignCardDescription>
          </View>
          <FontAwesome5 name="arrow-right" color="#f2f2f2" size={17} />
        </CampaignCard>
      ))}
    </Container>
  );
};

export default Campaigns;
