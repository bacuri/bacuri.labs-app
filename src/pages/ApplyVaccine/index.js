import React, { useRef } from 'react';
import { Alert, Button, StyleSheet, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
// import { BarCodeScanner } from 'expo-camera';
import { decode } from 'base-64';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Layer, LayerCenter, Focused, Title } from './styles';

import api from '../../services/api';

function ApplyVaccine() {
  const navigation = useNavigation();
  const route = useRoute();

  const { id } = route.params;

  const [permission, requestPermission] = useCameraPermissions();
  const qrLock = useRef(false);

  const handleBarCodeScanned = async ({ data }) => {
    if (!data || qrLock.current) {
      return;
    }

    qrLock.current = true;

    try {
      const decodedData = decode(data);

      await api.post(
        `/vaccine/apply?profileId=${id}&${decodedData}`,
        decodedData,
      );

      Alert.alert(`Sucesso!`, `Vacina aplicada com sucesso`);
    } catch (err) {
      Alert.alert(
        'Ops!',
        'Ocorreu um erro ao aplicar a vacina, tente novamente!',
      );
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
        <Title>We need your permission to show the camera</Title>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  return (
    <CameraView
      facing="back"
      barcodeScannerSettings={{
        barcodeTypes: ['qr'],
      }}
      onBarcodeScanned={handleBarCodeScanned}
      style={StyleSheet.absoluteFill}
    >
      <Layer />
      <LayerCenter>
        <Layer />
        <Focused />
        <Layer />
      </LayerCenter>
      <Layer />
    </CameraView>
  );
}

export default ApplyVaccine;
