import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  FontAwesome5,
  MaterialIcons,
  Foundation,
  MaterialCommunityIcons,
} from '@expo/vector-icons';

import {
  Card,
  CardTitle,
  CardHeader,
  CardDescription,
  Badge,
  CollapseButton,
  CardDetails,
  Main,
  Details,
  Ball,
} from './styles';

function VaccineCard({ item }) {
  const { t } = useTranslation();
  const [collapse, setCollapse] = useState(false);
  const [numberDoses, setNumberDoses] = useState({});

  const {
    name,
    preventedDiseases,
    initialRange,
    finalRange,
    observation,
    dosage,
    range,
    requirement,
    nextVaccine,
  } = item.vaccine;

  const dosageLabel = {
    DOSAGE_UNIQUE: t('vaccineCard.dosageUnique'),
    DOSAGE_1: t('vaccineCard.dosage1'),
    DOSAGE_2: t('vaccineCard.dosage2'),
    DOSAGE_3: t('vaccineCard.dosage3'),
    DOSAGE_REINFORCEMENT: t('vaccineCard.dosageReinforcement'),
    DOSAGE_1_REINFORCEMENT: t('vaccineCard.dosage1Reinforcement'),
    DOSAGE_2_REINFORCEMENT: t('vaccineCard.dosage2Reinforcement'),
    DOSAGE_DECADE: t('vaccineCard.dosageDecade'),
  };

  useEffect(() => {
    const getNextVaccines = vaccine => {
      let currentVaccine = vaccine;

      let numberVaccines = 0;
      let numberAppliedVaccines = 0;

      while (currentVaccine) {
        numberVaccines += 1;
        numberAppliedVaccines += currentVaccine.applied ? 1 : 0;

        currentVaccine = currentVaccine.nextVaccine;
      }

      return { numberVaccines, numberAppliedVaccines };
    };

    setNumberDoses(getNextVaccines(nextVaccine));
  }, []);

  const formatAgeRange = (initialRangeValue, finalRangeValue) => {
    if (initialRangeValue === 0) {
      return t('vaccineCard.atBirth');
    }

    const isYears = initialRangeValue > 15;
    const initialValue = isYears ? initialRangeValue / 12 : initialRangeValue;
    const finalValue = isYears ? finalRangeValue / 12 : finalRangeValue;
    const translationKey = isYears
      ? 'vaccineCard.ageYear'
      : 'vaccineCard.ageMonth';

    const initialText = t(translationKey, { count: initialValue });
    const finalText = t(translationKey, { count: finalValue });

    if (initialValue !== finalValue) {
      return t('vaccineCard.ageRange', {
        initial: initialText,
        final: finalText,
      });
    }
    return initialText;
  };

  const applicationRange = formatAgeRange(initialRange, finalRange);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>

        {requirement === 'GIRL' && (
          <Badge color="#f4c2c2">
            <Foundation name="female-symbol" color="white" size={16} />
          </Badge>
        )}
        {requirement === 'BOY' && (
          <Badge color="#89cff0">
            <Foundation name="male-symbol" color="white" size={16} />
          </Badge>
        )}
        {range === 'INFANT' && (
          <Badge color="#feff51">
            <MaterialIcons name="child-friendly" color="white" size={16} />
          </Badge>
        )}
        {item.applied && (
          <Badge>
            <FontAwesome5 name="check" color="white" size={16} />
          </Badge>
        )}
      </CardHeader>

      <CardDetails>
        <Main>
          <CardDescription>
            {t('vaccineCard.preventedDiseases', {
              diseases: preventedDiseases,
            })}
          </CardDescription>
          <CardDescription>
            {t('vaccineCard.applicationAge', { age: applicationRange })}
          </CardDescription>
          <CardDescription>
            {t('vaccineCard.dose', { doseType: dosageLabel[dosage] })}
          </CardDescription>
        </Main>
        <Details>
          {[...Array(numberDoses.numberVaccines)].map((e, index) => (
            <Ball
              key={String(index)}
              color={numberDoses.numberAppliedVaccines > index + 1}
            />
          ))}
        </Details>
      </CardDetails>
      {!!observation && (
        <>
          {collapse && (
            <CardDescription>
              {t('vaccineCard.observation', { observation })}
            </CardDescription>
          )}
          <CollapseButton onPress={() => setCollapse(prevOpen => !prevOpen)}>
            <MaterialCommunityIcons
              name={!collapse ? 'chevron-double-down' : 'chevron-double-up'}
              color="white"
              size={24}
            />
          </CollapseButton>
        </>
      )}
    </Card>
  );
}

export default VaccineCard;
