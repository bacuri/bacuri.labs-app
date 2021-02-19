import React, { useLayoutEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FontAwesome5 as Icon } from '@expo/vector-icons';

import { Header, Title, Card, CardTitle, Footer, ScrollView } from './styles';

import { Container } from '../../components/GlobalStyles';

function Dependent() {
  const navigation = useNavigation();
  const route = useRoute();

  const { id, name } = route.params;

  React.useLayoutEffect(() => {
    navigation.setOptions({ headerTitle: name });
  }, [navigation, route]);

  return (
    <>
      {/* <Container>
        <Header />
      </Container> */}

      <Footer>
        <Title>Ações</Title>
        <ScrollView>
          <Card onPress={() => navigation.navigate('ApplyVaccine', { id })}>
            <Icon name="syringe" color="#fff" size={16} />
            <CardTitle>Registrar vacina</CardTitle>
          </Card>

          <Card onPress={() => navigation.navigate('MyVaccines', { id })}>
            <Icon name="notes-medical" color="#fff" size={16} />
            <CardTitle>Minhas Vacinas</CardTitle>
          </Card>

          <Card onPress={() => navigation.navigate('Campaigns', { id })}>
            <Icon name="marker" color="#fff" size={16} />
            <CardTitle>Campanhas de vacinação</CardTitle>
          </Card>
        </ScrollView>
      </Footer>
    </>
  );
}

export default Dependent;
