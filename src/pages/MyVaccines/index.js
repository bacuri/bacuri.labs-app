import { useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';

import { VaccineList, Error, Loading } from './styles';

import { Container } from '../../components/GlobalStyles';
import VaccineCard from '../../components/VaccineCard';

import { getVaccineTimeline } from '../../services/vaccineService';

function MyVaccines() {
  const route = useRoute();
  const { t } = useTranslation();

  const { id } = route.params;

  const { data, error, isLoading } = useSWR(['vaccineTimeline', id], () => getVaccineTimeline(id));
  const vaccineList = data || [];
  const errorMessage = error ? t('myVaccines.errorMessage') : null;

  if (isLoading)
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
