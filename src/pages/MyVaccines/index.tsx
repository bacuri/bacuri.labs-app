import { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import { VaccineList, Error, Loading } from './styles';

import { Container } from '../../components/GlobalStyles';
import VaccineCard from '../../components/VaccineCard';

import type { RouteProps } from '../../@types/navigation';
import type { VaccineTimelineItem } from '../../@types/models';
import { getVaccineTimeline } from '../../services/vaccine/vaccine.service';

function MyVaccines() {
  const route = useRoute<RouteProps<'MyVaccines'>>();
  const { t } = useTranslation();

  const { id } = route.params;

  const [vaccineList, setVaccineList] = useState<VaccineTimelineItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
      keyExtractor={(item, index) => String(index)}
      renderItem={({ item }) => (
        <VaccineCard item={item as VaccineTimelineItem} />
      )}
    />
  );
}

export default MyVaccines;