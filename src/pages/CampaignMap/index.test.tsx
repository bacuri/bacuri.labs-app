import { Alert } from 'react-native';
import { render, waitFor } from '@testing-library/react-native';
import * as Location from 'expo-location';

import CampaignMap from '.';

const mockUseRoute = jest.fn();
const alertSpy = jest.spyOn(Alert, 'alert');

jest.mock('@react-navigation/native', () => ({
  useRoute: () => mockUseRoute(),
}));

jest.mock('expo-location', () => ({
  __esModule: true,
  requestForegroundPermissionsAsync: jest.fn(),
  getCurrentPositionAsync: jest.fn(),
}));

jest.mock('react-native-maps', () => {
  const React = require('react');
  const { Text, View } = require('react-native');

  const MapView = (props: Record<string, unknown>) =>
    React.createElement(View, props);

  const Marker = ({ title, children, ...props }: Record<string, unknown>) =>
    React.createElement(Text, props, title ?? children);

  return {
    __esModule: true,
    default: MapView,
    Marker,
  };
});

const mockRequestForegroundPermissionsAsync =
  Location.requestForegroundPermissionsAsync as jest.Mock;
const mockGetCurrentPositionAsync =
  Location.getCurrentPositionAsync as jest.Mock;

const places = [
  {
    id: 1,
    name: 'Place A',
    applied: 3,
    amount: 10,
    latitude: '-23.55',
    longitude: '-46.63',
  },
  {
    id: 2,
    name: 'Place B',
    applied: 1,
    amount: 5,
    latitude: '-23.56',
    longitude: '-46.64',
  },
];

describe('CampaignMap', () => {
  beforeEach(() => {
    mockUseRoute.mockReset();
    mockRequestForegroundPermissionsAsync.mockReset();
    mockGetCurrentPositionAsync.mockReset();
    alertSpy.mockClear();
    mockUseRoute.mockReturnValue({ params: { places } });
  });

  it('alerts when the location permission is denied', async () => {
    mockRequestForegroundPermissionsAsync.mockResolvedValue({
      status: 'denied',
    });

    const { queryByText } = render(<CampaignMap />);

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith(
        'campaignMap.permissionTitle',
        'campaignMap.permissionMessage',
      );
    });

    expect(mockGetCurrentPositionAsync).not.toHaveBeenCalled();
    expect(queryByText('Place A')).toBeNull();
  });

  it('renders the map with markers once the position is available', async () => {
    mockRequestForegroundPermissionsAsync.mockResolvedValue({
      status: 'granted',
    });
    mockGetCurrentPositionAsync.mockResolvedValue({
      coords: { latitude: -23.55, longitude: -46.63 },
    });

    const { getByText, queryByText } = render(<CampaignMap />);

    expect(queryByText('Place A')).toBeNull();

    await waitFor(() => expect(getByText('Place A')).toBeTruthy());
    expect(getByText('Place B')).toBeTruthy();
  });
});
