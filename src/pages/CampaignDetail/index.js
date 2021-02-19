import React from 'react';
import { Image, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

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

function CampaignDetail() {
  const navigation = useNavigation();
  const route = useRoute();

  const { title, description, image, places } = route.params;

  const remainingVaccines = () => {
    const totalVaccines = places.reduce((acc, el) => (acc += el.amount), 0);

    const totalApplied = places.reduce((acc, el) => (acc += el.applied), 0);

    return totalVaccines - totalApplied;
  };

  return (
    <Container spaceBetween>
      <View>
        <Header>
          <Image
            source={{ uri: image }}
            style={{ flex: 1, aspectRatio: 1, marginRight: 10 }}
          />

          <HeaderText>
            <Title>{title}</Title>

            <Description>{description}</Description>
          </HeaderText>
        </Header>

        <TitleSecondary>Informações gerais</TitleSecondary>

        <NumberCard>
          <Number>{remainingVaccines()}</Number>
          <Text>Vacinas restantes</Text>
        </NumberCard>
      </View>

      <Button onPress={() => navigation.navigate('CampaignMap', { places })}>
        Ver locais disponíveis
      </Button>
    </Container>
  );
}

export default CampaignDetail;
