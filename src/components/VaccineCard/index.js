import React, { useState } from 'react';
import { Text } from 'react-native';
import { useRoute } from '@react-navigation/native';

import {
  Card,
  CardTitle,
  CardHeader,
  CardDescription,
  Badge,
  BadgeText,
} from './styles';

const dosageLabel = {
  DOSAGE_UNIQUE: 'Dose única',
  DOSAGE_1: 'Primeira dose',
  DOSAGE_2: 'Segunda dose',
  DOSAGE_3: 'Terceira dose',
  DOSAGE_REINFORCEMENT: 'Reforço',
  DOSAGE_1_REINFORCEMENT: 'Primeira dose de reforço',
  DOSAGE_2_REINFORCEMENT: 'Segunda dose de reforço',
  DOSAGE_DECADE: 'Dose por década',
};

function VaccineCard({ item }) {
  // const route = useRoute();

  const {
    name,
    preventedDiseases,
    initialRange,
    finalRange,
    observation,
    dosage,
  } = item.vaccine;

  const vaccineApplicationAge = (initialRange, finalRange) => {
    let initialText = '';
    let finalText = '';

    if (initialRange > 15) {
      initialRange /= 12;
      finalRange /= 12;

      const isPlural = initialRange > 1 ? 's' : '';

      initialText = `${initialRange} ano${isPlural}`;
      finalText = `${finalRange} ano${isPlural}`;
    } else {
      const isPlural = initialRange > 1 ? 'meses' : 'mês';

      initialText = `${initialRange} ${isPlural}`;
      finalText = `${finalRange} ${isPlural}`;
    }

    if (initialRange !== finalRange) {
      return `${initialText} até ${finalText}`;
    }
    if (initialRange === 0) {
      return `Ao nascer`;
    }
    return initialText;
  };

  const applicationRange = vaccineApplicationAge(initialRange, finalRange);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        {item.applied && (
          <Badge>
            <BadgeText>Aplicado</BadgeText>
          </Badge>
        )}
      </CardHeader>
      <CardDescription>
        {`Doenças prevenidas: ${preventedDiseases}`}
      </CardDescription>
      <CardDescription>
        {`Idade de aplicação: ${applicationRange}`}
      </CardDescription>
      <CardDescription>{`Dose: ${dosageLabel[dosage]}`}</CardDescription>
      {!!observation && (
        <CardDescription>{`Observação: ${observation}`}</CardDescription>
      )}
    </Card>
  );
}

export default VaccineCard;
