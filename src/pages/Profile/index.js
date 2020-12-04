import React, { useState } from 'react';
import { FlatList } from 'react-native';

import {
  Container,
  Logout,
  LogoutText,
  Title,
  ProfileCard,
  ProfileCardImage,
  ProfileCardText,
  Plus,
} from './styles';

import Header from '../../components/Header';

function Profile() {
  const [profiles, setProfiles] = useState([
    { id: 4, nome: 'Eu' },
    { id: 1, nome: 'Valentina' },
    { id: 2, nome: 'Lucas' },
    { id: 3, nome: 'Enzo' },
  ]);

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

  const renderItem = ({ item }) => (
    <ProfileCard>
      <ProfileCardImage empty={item.empty} transparent={item.addButton}>
        {item.addButton && <Plus />}
      </ProfileCardImage>
      <ProfileCardText>{!!item.nome && item.nome}</ProfileCardText>
    </ProfileCard>
  );

  const RightSide = () => (
    <Logout>
      <LogoutText>Sair</LogoutText>
    </Logout>
  );

  const columns = 3;

  return (
    <Container>
      <Header RightSide={RightSide} />

      <Title>Selecione seu perfil</Title>

      <FlatList
        data={createRows([...profiles, { addButton: true }], columns)}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        numColumns={columns}
      />
    </Container>
  );
}

export default Profile;
