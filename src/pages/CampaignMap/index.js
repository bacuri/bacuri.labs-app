import React, { useState, useEffect } from 'react';
import { Alert, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

import { Container } from '../../components/GlobalStyles';
import { Map } from './styles';

const CampaignMap = () => {
  const route = useRoute();

  const { places } = route.params;

  const [initialPosition, setInitialPosition] = useState([0, 0]);

  useEffect(() => {
    async function loadPosition() {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert(
          'Ops',
          'Precisamos de sua permissão para obter a localização',
        );
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      setInitialPosition([latitude, longitude]);
    }

    loadPosition();
  }, []);

  if (initialPosition[0] === 0) {
    return (
      <Container center>
        <ActivityIndicator size="large" color="#fff" />
      </Container>
    );
  }

  return (
    <Map
      initialRegion={{
        latitude: initialPosition[0],
        longitude: initialPosition[1],
        latitudeDelta: 0.014,
        longitudeDelta: 0.014,
      }}
    >
      {places.map(point => (
        <Marker
          key={String(point.id)}
          coordinate={{
            latitude: Number(point.latitude),
            longitude: Number(point.longitude),
          }}
          title={point.name}
          description={`${point.applied}/${point.amount}`}
        />
      ))}
    </Map>
  );
};

export default CampaignMap;
