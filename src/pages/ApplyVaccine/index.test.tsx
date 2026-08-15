import { Alert } from 'react-native';
import { fireEvent, render, waitFor } from '@testing-library/react-native';

import ApplyVaccine from '.';

import { applyVaccine } from '../../services/vaccine/vaccine.service';

const mockGoBack = jest.fn();
const mockUseRoute = jest.fn();
const mockRequestPermission = jest.fn();
const alertSpy = jest.spyOn(Alert, 'alert');
let mockCameraPermission: { granted: boolean } | undefined;

const mockApplyVaccine = applyVaccine as jest.Mock;

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ goBack: mockGoBack, navigate: jest.fn() }),
  useRoute: () => mockUseRoute(),
}));

jest.mock('../../services/vaccine/vaccine.service', () => ({
  applyVaccine: jest.fn(),
}));

jest.mock('expo-camera', () => {
  const React = require('react');
  const { View } = require('react-native');

  return {
    __esModule: true,
    CameraView: (props: Record<string, unknown>) =>
      React.createElement(View, { testID: 'camera-view', ...props }),
    useCameraPermissions: () => [mockCameraPermission, mockRequestPermission],
  };
});

describe('ApplyVaccine', () => {
  beforeEach(() => {
    mockGoBack.mockReset();
    mockUseRoute.mockReset();
    mockRequestPermission.mockReset();
    mockApplyVaccine.mockReset();
    alertSpy.mockClear();
    mockCameraPermission = undefined;
    mockUseRoute.mockReturnValue({ params: { id: 5 } });
  });

  it('renders an empty view while the camera permission is loading', () => {
    const { queryByText } = render(<ApplyVaccine />);

    expect(queryByText('applyVaccine.permissionTitle')).toBeNull();
  });

  it('shows the permission prompt and requests permission on press', () => {
    mockCameraPermission = { granted: false };

    const { getByText } = render(<ApplyVaccine />);

    expect(getByText('applyVaccine.permissionTitle')).toBeTruthy();
    fireEvent.press(getByText('applyVaccine.permissionButton'));
    expect(mockRequestPermission).toHaveBeenCalled();
  });

  it('applies the vaccine and shows a success alert when a QR code is scanned', async () => {
    mockCameraPermission = { granted: true };
    mockApplyVaccine.mockResolvedValue({ id: 1 });

    const { getByTestId } = render(<ApplyVaccine />);

    fireEvent(getByTestId('camera-view'), 'barcodeScanned', {
      data: 'SGVsbG8gV29ybGQ=',
    });

    await waitFor(() => {
      expect(mockApplyVaccine).toHaveBeenCalledWith(5, 'Hello World');
      expect(alertSpy).toHaveBeenCalledWith(
        'applyVaccine.successTitle',
        'applyVaccine.successMessage',
      );
      expect(mockGoBack).toHaveBeenCalledTimes(1);
    });
  });

  it('shows an error alert when applying the vaccine fails', async () => {
    mockCameraPermission = { granted: true };
    mockApplyVaccine.mockRejectedValue(new Error('vaccine application failed'));

    const { getByTestId } = render(<ApplyVaccine />);

    fireEvent(getByTestId('camera-view'), 'barcodeScanned', {
      data: 'SGVsbG8gV29ybGQ=',
    });

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith(
        'applyVaccine.errorTitle',
        'applyVaccine.errorMessage',
      );
      expect(mockGoBack).toHaveBeenCalledTimes(1);
    });
  });

  it('ignores scans without data', () => {
    mockCameraPermission = { granted: true };

    const { getByTestId } = render(<ApplyVaccine />);

    fireEvent(getByTestId('camera-view'), 'barcodeScanned', { data: null });

    expect(mockApplyVaccine).not.toHaveBeenCalled();
  });
});
