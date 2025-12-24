import { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import { VaccineList, Error, Loading } from './styles';

import { Container } from '../../components/GlobalStyles';
import VaccineCard from '../../components/VaccineCard';

import { getVaccineTimeline } from '../../services/vaccineService';

function MyVaccines() {
  const route = useRoute();
  const { t } = useTranslation();

  const { id } = route.params;

  const [vaccineList, setVaccineList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const getVaccines = async () => {
      try {
        const vaccines = await getVaccineTimeline(id);

        setVaccineList(vaccines);
      } catch (err) {
        setErrorMessage(t('myVaccines.errorMessage'));
      } finally {
        setLoading(false);
      }
    };

    getVaccines();
  }, []);

  if (loading)
    return (
      <Container center>
        <Loading />
      </Container>
    );

  if (errorMessage)
    return (
      <Container>
        <Error>{errorMessage}</Error>
      </Container>
    );

  return (
    <VaccineList
      data={vaccineList}
      keyExtractor={(item, index) => index}
      renderItem={({ item }) => <VaccineCard item={item} />}
    />
  );
}

export default MyVaccines;
