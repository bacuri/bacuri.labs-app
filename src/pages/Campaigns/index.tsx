import { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import { getMyCampaigns } from '../../services/campaign/campaign.service';

import { Container } from '../../components/GlobalStyles';
import {
  CampaignCard,
  CampaignCardTitle,
  CampaignCardDescription,
  CampaignList,
} from './styles';

import type { NavigationProp, RouteProps } from '../../@types/navigation';
import type { Campaign } from '../../@types/models';

const Campaigns = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteProps<'Campaigns'>>();

  const { id } = route.params;

  const [campaignsList, setCampaignsList] = useState<Campaign[]>([]);
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
      keyExtractor={item => String((item as Campaign).id)}
      renderItem={({ item }) => {
        const campaign = item as Campaign;

        return (
          <CampaignCard
            onPress={() =>
              navigation.navigate('CampaignDetail', { ...campaign })
            }
          >
            <View>
              <CampaignCardTitle>{campaign.title}</CampaignCardTitle>
              <CampaignCardDescription>
                {campaign.description}
              </CampaignCardDescription>
            </View>
            <FontAwesome5 name="arrow-right" color="#f2f2f2" size={17} />
          </CampaignCard>
        );
      }}
    />
  );
};

export default Campaigns;