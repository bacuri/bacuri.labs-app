import { useRef } from 'react';
import { Alert, Button, StyleSheet, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
// import { BarCodeScanner } from 'expo-camera';
import { decode } from 'base-64';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useTranslation } from 'react-i18next';
import { OverlayContainer, Layer, LayerCenter, Focused, Title } from './styles';

import type { NavigationProp, RouteProps } from '../../@types/navigation';
import { applyVaccine } from '../../services/vaccine/vaccine.service';

function ApplyVaccine() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteProps<'ApplyVaccine'>>();
  const { t } = useTranslation();

  const { id } = route.params;

  const [permission, requestPermission] = useCameraPermissions();
  const qrLock = useRef(false);

  const handleBarCodeScanned = async ({ data }: { data?: string | null }) => {
    if (!data || qrLock.current) {
      return;
    }

    qrLock.current = true;

    try {
      const decodedData = decode(data);

      await applyVaccine(id, decodedData);

      Alert.alert(
        t('applyVaccine.successTitle'),
        t('applyVaccine.successMessage'),
      );
    } catch {
      Alert.alert(t('applyVaccine.errorTitle'), t('applyVaccine.errorMessage'));
    } finally {
      navigation.goBack();
    }
  };

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View>
        <Title>{t('applyVaccine.permissionTitle')}</Title>
        <Button
          onPress={requestPermission}
          title={t('applyVaccine.permissionButton')}
        />
      </View>
    );
  }

  return (
    <>
      <CameraView
        facing="back"
        barcodeScannerSettings={{
          barcodeTypes: ['qr'],
        }}
        onBarcodeScanned={handleBarCodeScanned}
        style={StyleSheet.absoluteFill}
      />
      <OverlayContainer>
        <Layer />
        <LayerCenter>
          <Layer />
          <Focused />
          <Layer />
        </LayerCenter>
        <Layer />
      </OverlayContainer>
    </>
  );
}

export default ApplyVaccine;
