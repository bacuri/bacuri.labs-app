/* eslint-disable camelcase */
import { render, fireEvent } from '@testing-library/react-native';
import type { TFunction } from 'i18next';

import { Foundation, MaterialCommunityIcons } from '@expo/vector-icons';

import VaccineCard, { formatAgeRange, getNextVaccines } from '.';

import type { Vaccine, VaccineTimelineItem } from '../../@types/models';

function makeVaccine(overrides: Partial<Vaccine> = {}): Vaccine {
  return {
    name: 'BCG',
    preventedDiseases: 'tuberculosis',
    initialRange: 0,
    finalRange: 0,
    observation: '',
    dosage: 'DOSAGE_UNIQUE',
    range: 'INFANT',
    requirement: null,
    nextVaccine: null,
    ...overrides,
  };
}

function makeItem(vaccine: Vaccine = makeVaccine()): VaccineTimelineItem {
  return { vaccine, applied: false };
}

describe('getNextVaccines', () => {
  it('returns zeroes for a null chain', () => {
    expect(getNextVaccines(null)).toEqual({
      numberVaccines: 0,
      numberAppliedVaccines: 0,
    });
  });

  it('counts vaccines and applied vaccines along the chain', () => {
    const last = makeVaccine({ name: 'Hepatitis B', applied: true });
    const middle = makeVaccine({
      name: 'BCG booster',
      applied: false,
      nextVaccine: last,
    });
    const first = makeVaccine({
      name: 'BCG',
      applied: true,
      nextVaccine: middle,
    });

    expect(getNextVaccines(first)).toEqual({
      numberVaccines: 3,
      numberAppliedVaccines: 2,
    });
  });
});

describe('formatAgeRange', () => {
  const t = jest.fn((key: string) => key) as unknown as TFunction & jest.Mock;

  it('returns atBirth when the range starts at 0', () => {
    expect(formatAgeRange(0, 0, t)).toBe('vaccineCard.atBirth');
    expect(t).toHaveBeenCalledWith('vaccineCard.atBirth');
  });

  it('formats month ranges', () => {
    const result = formatAgeRange(2, 6, t);

    expect(result).toBe('vaccineCard.ageRange');
    expect(t).toHaveBeenCalledWith('vaccineCard.ageMonth', { count: 2 });
    expect(t).toHaveBeenCalledWith('vaccineCard.ageMonth', { count: 6 });
  });

  it('formats year ranges for values above 15 months', () => {
    const result = formatAgeRange(24, 48, t);

    expect(result).toBe('vaccineCard.ageRange');
    expect(t).toHaveBeenCalledWith('vaccineCard.ageYear', { count: 2 });
    expect(t).toHaveBeenCalledWith('vaccineCard.ageYear', { count: 4 });
  });

  it('returns a single value when the range is a point', () => {
    expect(formatAgeRange(6, 6, t)).toBe('vaccineCard.ageMonth');
  });
});

describe('VaccineCard', () => {
  it('renders the vaccine name and dose label', () => {
    const item = makeItem(makeVaccine({ dosage: 'DOSAGE_1' }));

    const { getByText } = render(<VaccineCard item={item} />);

    expect(getByText('BCG')).toBeTruthy();
    expect(getByText('vaccineCard.dose')).toBeTruthy();
  });

  it('toggles the observation details', () => {
    const item = makeItem(makeVaccine({ observation: 'special care' }));

    const { queryByText, UNSAFE_getByType } = render(
      <VaccineCard item={item} />,
    );

    expect(queryByText('vaccineCard.observation')).toBeNull();

    fireEvent.press(UNSAFE_getByType(MaterialCommunityIcons));

    expect(queryByText('vaccineCard.observation')).toBeTruthy();
  });

  it('renders the gender badge for GIRL vaccines', () => {
    const item = makeItem(makeVaccine({ requirement: 'GIRL' }));

    const { UNSAFE_getByType } = render(<VaccineCard item={item} />);

    expect(UNSAFE_getByType(Foundation)).toBeTruthy();
  });
});
