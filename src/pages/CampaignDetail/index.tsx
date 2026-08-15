import { Image, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import { Container } from '../../components/GlobalStyles';
import Button from '../../components/Button';
import {
  Header,
  HeaderText,
  Title,
  Description,
  TitleSecondary,
  NumberCard,
  Number,
  Text,
} from './styles';

import type { NavigationProp, RouteProps } from '../../@types/navigation';

function CampaignDetail() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteProps<'CampaignDetail'>>();
  const { t } = useTranslation();

  const { title, description, image, places } = route.params;

  const remainingVaccines = () => {
    const totalVaccines = places.reduce((acc, el) => acc + el.amount, 0);

    const totalApplied = places.reduce((acc, el) => acc + el.applied, 0);

    return totalVaccines - totalApplied;
  };

  return (
    <Container spaceBetween>
      <View>
        <Header>
          {image && (
            <Image
              source={{ uri: image }}
              style={{ flex: 1, aspectRatio: 1, marginRight: 10 }}
            />
          )}

          <HeaderText>
            <Title>{title}</Title>

            <Description>{description}</Description>
          </HeaderText>
        </Header>

        <TitleSecondary>{t('campaignDetail.generalInfoTitle')}</TitleSecondary>

        <NumberCard>
          <Number>{remainingVaccines()}</Number>
          <Text>{t('campaignDetail.remainingVaccines')}</Text>
        </NumberCard>
      </View>

      <Button onPress={() => navigation.navigate('CampaignMap', { places })}>
        {t('campaignDetail.viewAvailablePlaces')}
      </Button>
    </Container>
  );
}

export default CampaignDetail;