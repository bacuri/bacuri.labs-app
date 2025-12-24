import React, { useLayoutEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

  const { id, name } = route.params;

  React.useLayoutEffect(() => {
    navigation.setOptions({ headerTitle: name });
  }, [navigation, route]);

  return (
    <Background>
      {/* <Container>
      </Container> */}
      <Header>
        <HeaderTitle>{t('dependent.welcomeTitle')}</HeaderTitle>
        <HeaderDescription>
          {t('dependent.welcomeDescription')}
        </HeaderDescription>
      </Header>

      <Footer>
        <Title>{t('dependent.actionsTitle')}</Title>
        <ScrollView>
          <Card onPress={() => navigation.navigate('ApplyVaccine', { id })}>
            <IconCard>
              <Icon name="syringe" color="#000" size={16} />
            </IconCard>
            <CardTitle>{t('dependent.applyVaccineTitle')}</CardTitle>
            <CardDescription>
              {t('dependent.applyVaccineDescription')}
            </CardDescription>
          </Card>

          <Card onPress={() => navigation.navigate('MyVaccines', { id })}>
            <IconCard>
              <Icon name="notes-medical" color="#000" size={16} />
            </IconCard>
            <CardTitle>{t('dependent.myVaccinesTitle')}</CardTitle>
            <CardDescription>
              {t('dependent.myVaccinesDescription')}
            </CardDescription>
          </Card>

          <Card onPress={() => navigation.navigate('Campaigns', { id })}>
            <IconCard>
              <Icon name="marker" color="#000" size={16} />
            </IconCard>
            <CardTitle>{t('dependent.campaignsTitle')}</CardTitle>
            <CardDescription>
              {t('dependent.campaignsDescription')}
            </CardDescription>
          </Card>
        </ScrollView>
      </Footer>
    </Background>
  );
}

export default Dependent;
