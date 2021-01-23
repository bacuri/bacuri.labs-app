import React, { useState, useEffect } from 'react';
import { FlatList, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Container } from '../../components/GlobalStyles';
import {
  Logout,
  LogoutText,
  Title,
  ProfileCard,
  ProfileCardImage,
  ProfileCardText,
  Plus,
} from './styles';

import Header from '../../components/Header';

import { useAuth } from '../../contexts/auth';
import api from '../../services/api';

function ProfileList() {
  const navigation = useNavigation();
  const { logout } = useAuth();

  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const response = await api.get('/user');

        const { data } = response;
        const { dependentProfiles, ...user } = data.content;

        const me = {
          ...user,
          firstName: 'Eu',
          lastName: '',
        };

        setProfiles([me, ...dependentProfiles]);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    getUserInfo();
  }, []);

  function createRows(data, columns) {
    const rows = Math.floor(data.length / columns);
    let lastRowElements = data.length - rows * columns;

    while (lastRowElements !== columns) {
      data.push({
        id: `empty-${lastRowElements}`,
        name: `empty-${lastRowElements}`,
        empty: true,
      });
      lastRowElements += 1;
    }
    return data;
  }

  const renderItem = ({ item }) => {
    const nextScreen = !item.addButton ? 'Dependent' : 'AddDependent';

    return (
      <ProfileCard
        onPress={() => navigation.navigate(nextScreen, { id: item.id })}
      >
        <ProfileCardImage empty={item.empty} transparent={item.addButton}>
          {item.addButton && <Plus />}
        </ProfileCardImage>
        <ProfileCardText>
          {!!item.firstName && item.firstName}
          {!!item.lastName && ` ${item.lastName}`}
        </ProfileCardText>
      </ProfileCard>
    );
  };

  const RightSideComponent = () => (
    <Logout onPress={logout}>
      <LogoutText>Sair</LogoutText>
    </Logout>
  );

  const columns = 3;

  return (
    <Container>
      <Header rightSide={RightSideComponent} />
      <Title>Selecione seu perfil</Title>

      {loading ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : (
        <FlatList
          data={createRows([...profiles, { addButton: true }], columns)}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          numColumns={columns}
        />
      )}
    </Container>
  );
}

export default ProfileList;
