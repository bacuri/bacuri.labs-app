import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import api from '../../services/api';

import { Map } from './styles';

const Campaigns = () => {
  const navigation = useNavigation();

  const [points, setPoints] = useState([
    {
      id: 1,
      name: 'Coronavirus',
      description: 'Campanha de vacinação contra o coronavirus',
      amount: 1000,
      applied: 100,
      latitude: -3.7619033,
      longitude: -49.6769428,
    },
  ]);

  const [initialPosition, setInitialPosition] = useState([0, 0]);

  useEffect(() => {
    async function loadPosition() {
      const { status } = await Location.requestPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert(
          'Ops',
          'Precisamos de sua permissão para obter a localização',
        );
        return;
      }

      const location = await Location.getCurrentPositionAsync();

      const { latitude, longitude } = location.coords;

      setInitialPosition([latitude, longitude]);
    }

    loadPosition();
  }, []);

  function handleNavigateToDetail(point) {
    navigation.navigate('CampaignDetail', { ...point });
  }

  return (
    initialPosition[0] !== 0 && (
      <Map
        initialRegion={{
          latitude: initialPosition[0],
          longitude: initialPosition[1],
          latitudeDelta: 0.014,
          longitudeDelta: 0.014,
        }}
      >
        {points.map(point => (
          <Marker
            key={String(point.id)}
            onPress={() => handleNavigateToDetail(point)}
            coordinate={{
              latitude: point.latitude,
              longitude: point.longitude,
            }}
            title={point.name}
          />
        ))}
      </Map>
    )
  );
};

export default Campaigns;
