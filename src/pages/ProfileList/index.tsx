import { useState, useEffect } from 'react';
import {
  FlatList,
  ActivityIndicator,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

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

import Bear from '../../assets/icon.svg';

import { useAuth } from '../../contexts/auth';
import { getUser } from '../../services/user/user.service';

import type { NavigationProp } from '../../@types/navigation';

interface ProfileCardItem {
  id?: number | string;
  firstName?: string;
  lastName?: string;
  name?: string;
  empty?: boolean;
  addButton?: boolean;
}

function ProfileList() {
  const navigation = useNavigation<NavigationProp>();
  const isFocused = useIsFocused();
  const { logout } = useAuth();
  const { t } = useTranslation();

  const [profiles, setProfiles] = useState<ProfileCardItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const data = await getUser();
        const { dependentProfiles } = data.content;

        setProfiles(dependentProfiles);
        setError(false);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    getUserInfo();
  }, [isFocused]);

  const ErrorPage = () => (
    <View>
      <Text>{t('profileList.errorTitle')}</Text>

      <Text>{t('profileList.errorSubtitle')}</Text>
      <TouchableOpacity>
        <Text>{t('profileList.reloadButton')}</Text>
      </TouchableOpacity>
    </View>
  );

  function createRows(data: ProfileCardItem[], columns: number) {
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

  const renderItem = ({ item }: { item: ProfileCardItem }) => (
    <ProfileCard
      disabled={!!item.empty}
      empty={item.empty}
      onPress={() => {
        if (item.addButton) {
          navigation.navigate('AddDependent');
        } else if (typeof item.id === 'number') {
          navigation.navigate('Dependent', {
            id: item.id,
            name: [item.firstName, item.lastName].filter(Boolean).join(' '),
          });
        }
      }}
    >
      <ProfileCardImage empty={item.empty} transparent={item.addButton}>
        {item.addButton ? (
          <Plus />
        ) : (
          <Bear style={item.empty && { opacity: 0 }} />
        )}
      </ProfileCardImage>
      <ProfileCardText>
        {!!item.firstName && item.firstName}
        {!!item.lastName && ` ${item.lastName}`}
      </ProfileCardText>
    </ProfileCard>
  );

  const RightSideComponent = () => (
    <Logout onPress={logout}>
      <LogoutText>{t('profileList.logout')}</LogoutText>
    </Logout>
  );

  const columns = 3;

  if (loading)
    return (
      <Container center>
        <ActivityIndicator size="large" color="#fff" />
      </Container>
    );

  return (
    <Container>
      <Header RightSide={RightSideComponent} />

      {error ? (
        <ErrorPage />
      ) : (
        <>
          <Title>{t('profileList.selectProfile')}</Title>

          <FlatList
            data={createRows([...profiles, { addButton: true }], columns)}
            keyExtractor={(item, index) => String(item.id ?? index)}
            renderItem={renderItem}
            numColumns={columns}
          />
        </>
      )}
    </Container>
  );
}

export default ProfileList;