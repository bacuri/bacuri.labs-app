import React, { useState, useEffect } from 'react';
import { Alert, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { decode } from 'base-64';
import { Layer, LayerCenter, Focused, Title } from './styles';

import api from '../../services/api';

function ApplyVaccine() {
  const navigation = useNavigation();
  const route = useRoute();

  const { id } = route.params;

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    try {
      setScanned(true);

      const decodedData = decode(data);

      await api.post(
        `/vaccine/apply?profileId=${id}&${decodedData}`,
        decodedData,
      );

      Alert.alert(`Sucesso!`, `Vacina aplicada com sucesso`);
      navigation.goBack();
    } catch (err) {
      Alert.alert(
        'Ops!',
        'Ocorreu um erro ao aplicar a vacina, tente novamente!',
      );
    }
  };

  if (!hasPermission) {
    return <Title>Você não tem permissão da câmera</Title>;
  }

  return (
    <BarCodeScanner
      onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
      style={StyleSheet.absoluteFill}
    >
      <Layer />
      <LayerCenter>
        <Layer />
        <Focused />
        <Layer />
      </LayerCenter>
      <Layer />
    </BarCodeScanner>
  );
}

export default ApplyVaccine;
