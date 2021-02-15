import React from 'react';
import { useRoute } from '@react-navigation/native';

import { Container } from '../../components/GlobalStyles';
import { Title, Description, NumberCard, Number, Text } from './styles';

function CampaignDetail() {
  const route = useRoute();

  const { name, description, amount, applied } = route.params;
  const remainingVaccines = amount - applied;

  return (
    <Container>
      <Title>{name}</Title>

      <Description>{description}</Description>

      <Description>Endereço: Avenida 31 de março, 50</Description>

      <NumberCard>
        <Number>{amount}</Number>
        <Text>Total de vacinas</Text>
      </NumberCard>
      <NumberCard>
        <Number>{applied}</Number>
        <Text>Vacinas aplicadas</Text>
      </NumberCard>
      <NumberCard>
        <Number>{remainingVaccines}</Number>
        <Text>Vacinas restantes</Text>
      </NumberCard>
    </Container>
  );
}

export default CampaignDetail;
