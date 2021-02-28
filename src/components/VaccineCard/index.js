import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    const getNextVaccines = vaccine => {
      let nextVaccine = vaccine;

      let numberVaccines = 0;
      let numberAppliedVaccines = 0;

      while (nextVaccine) {
        numberVaccines += 1;
        numberAppliedVaccines += nextVaccine.applied ? 1 : 0;

        nextVaccine = nextVaccine.nextVaccine;
      }

      return { numberVaccines, numberAppliedVaccines };
    };

    setNumberDoses(getNextVaccines(nextVaccine));
  }, []);

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
            {`Doenças prevenidas: ${preventedDiseases}`}
          </CardDescription>
          <CardDescription>
            {`Idade de aplicação: ${applicationRange}`}
          </CardDescription>
          <CardDescription>{`Dose: ${dosageLabel[dosage]}`}</CardDescription>
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
            <CardDescription>{`Observação: ${observation}`}</CardDescription>
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
