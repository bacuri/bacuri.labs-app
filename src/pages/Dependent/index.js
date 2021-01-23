import React from 'react';
import { ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FontAwesome5 as Icon } from '@expo/vector-icons';

import { Header, Title, Card, CardTitle, Footer } from './styles';

import { Container } from '../../components/GlobalStyles';

function Dependent() {
  const navigation = useNavigation();
  const route = useRoute();

  const { id } = route.params;

  return (
    <Container>
      <Header />

      <Footer>
        <Title>Ações</Title>

        <ScrollView horizontal>
          <Card onPress={() => navigation.navigate('ApplyVaccine', { id })}>
            <Icon name="syringe" color="#fff" size={16} />
            <CardTitle>Registrar vacina</CardTitle>
          </Card>

          <Card onPress={() => navigation.navigate('MyVaccines', { id })}>
            <Icon name="notes-medical" color="#fff" size={16} />
            <CardTitle>Minhas Vacinas</CardTitle>
          </Card>
        </ScrollView>
      </Footer>
    </Container>
  );
}

export default Dependent;
