import { ActivityIndicator } from 'react-native';
import { act, waitFor } from '@testing-library/react-native';

import MyVaccines from '.';
import { renderWithSWR } from '../../testUtils';

import { getVaccineTimeline } from '../../services/vaccine/vaccine.service';

import type { VaccineTimelineItem } from '../../@types/models';

jest.mock('@react-navigation/native', () => ({
  useRoute: () => ({ params: { id: 42 } }),
}));

jest.mock('../../services/vaccine/vaccine.service', () => ({
  getVaccineTimeline: jest.fn(),
}));

const mockedGetVaccineTimeline = getVaccineTimeline as jest.Mock;

const timelineItem = {
  vaccine: {
    name: 'BCG',
    preventedDiseases: 'tuberculosis',
    initialRange: 0,
    finalRange: 0,
    observation: '',
    dosage: 'DOSAGE_UNIQUE',
    range: 'INFANT',
    requirement: null,
    nextVaccine: null,
  },
  applied: true,
} as VaccineTimelineItem;

describe('MyVaccines', () => {
  beforeEach(() => {
    mockedGetVaccineTimeline.mockReset();
  });

  it('shows a loading indicator while fetching', async () => {
    let resolveTimeline: ((value: VaccineTimelineItem[]) => void) | undefined;
    mockedGetVaccineTimeline.mockImplementation(
      () =>
        new Promise<VaccineTimelineItem[]>((resolve) => {
          resolveTimeline = resolve;
        }),
    );

    const { UNSAFE_getByType } = renderWithSWR(<MyVaccines />);

    expect(UNSAFE_getByType(ActivityIndicator)).toBeTruthy();

    await act(async () => {
      resolveTimeline?.([]);
    });
  });

  it('renders the vaccine cards once loaded', async () => {
    mockedGetVaccineTimeline.mockResolvedValue([timelineItem]);

    const { getByText } = renderWithSWR(<MyVaccines />);

    await waitFor(() => expect(getByText('BCG')).toBeTruthy());
    expect(mockedGetVaccineTimeline).toHaveBeenCalledWith(42);
  });

  it('shows an error message when the fetch fails', async () => {
    mockedGetVaccineTimeline.mockRejectedValue(new Error('network error'));

    const { getByText } = renderWithSWR(<MyVaccines />);

    await waitFor(() =>
      expect(getByText('myVaccines.errorMessage')).toBeTruthy(),
    );
  });
});
