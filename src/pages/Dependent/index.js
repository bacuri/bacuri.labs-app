import React, { useLayoutEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

import {
  Background,
  Header,
  HeaderTitle,
  HeaderDescription,
  Title,
  Card,
  CardTitle,
  CardDescription,
  Footer,
  ScrollView,
  IconCard,
  Icon,
} from './styles';

import { Container } from '../../components/GlobalStyles';

function Dependent() {
  const navigation = useNavigation();
  const route = useRoute();

  const { id, name } = route.params;

  React.useLayoutEffect(() => {
    navigation.setOptions({ headerTitle: name });
  }, [navigation, route]);

  return (
    <Background>
      {/* <Container>
      </Container> */}
      <Header>
        <HeaderTitle>Boas vindas ao Bacuri Labs</HeaderTitle>
        <HeaderDescription>
          Faça aplicação das suas vacinas, veja as vacinas aplicadas e as
          campanhas disponíveis para você.
        </HeaderDescription>
      </Header>

      <Footer>
        <Title>Ações</Title>
        <ScrollView>
          <Card onPress={() => navigation.navigate('ApplyVaccine', { id })}>
            <IconCard>
              <Icon name="syringe" color="#000" size={16} />
            </IconCard>
            <CardTitle>Registrar vacina</CardTitle>
            <CardDescription>
              Escaneie uma vacina para que seja aplicada na sua carteira
            </CardDescription>
          </Card>

          <Card onPress={() => navigation.navigate('MyVaccines', { id })}>
            <IconCard>
              <Icon name="notes-medical" color="#000" size={16} />
            </IconCard>
            <CardTitle>Minhas Vacinas</CardTitle>
            <CardDescription>
              Veja toda a linha do tempo das vacinas aplicadas, doses e próximas
              vacinas
            </CardDescription>
          </Card>

          <Card onPress={() => navigation.navigate('Campaigns', { id })}>
            <IconCard>
              <Icon name="marker" color="#000" size={16} />
            </IconCard>
            <CardTitle>Campanhas de vacinação</CardTitle>
            <CardDescription>
              Veja as campanhas de vacinação disponíveis para você
            </CardDescription>
          </Card>
        </ScrollView>
      </Footer>
    </Background>
  );
}

export default Dependent;
