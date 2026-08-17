jest.mock('react-i18next', () => {
  const t = (key: string) => key;

  return {
    useTranslation: () => ({ t, i18n: { language: 'en-US' } }),
    initReactI18next: {
      type: '3rdParty',
      init: jest.fn(),
    },
  };
});

jest.mock('@expo/vector-icons', () => {
  const React = require('react');
  const { Text } = require('react-native');

  const iconNames = [
    'FontAwesome',
    'FontAwesome5',
    'MaterialIcons',
    'MaterialCommunityIcons',
    'Foundation',
    'Ionicons',
    'Feather',
    'Entypo',
    'AntDesign',
    'SimpleLineIcons',
  ];

  const icons: Record<
    string,
    React.ComponentType<Record<string, unknown>>
  > = {};

  iconNames.forEach((name) => {
    icons[name] = function IconMock(props: Record<string, unknown>) {
      return React.createElement(Text, props, name);
    };
  });

  return icons;
});

jest.mock('react-native-gesture-handler', () => {
  const React = require('react');
  const { TouchableOpacity } = require('react-native');

  function ButtonComponent({
    children,
    onPress,
    ...rest
  }: {
    children: React.ReactNode;
    onPress?: () => void;
  }) {
    return React.createElement(
      TouchableOpacity,
      { onPress, ...rest },
      children,
    );
  }

  return {
    RectButton: ButtonComponent,
    BaseButton: ButtonComponent,
    RawButton: ButtonComponent,
    BorderlessButton: ButtonComponent,
    ScrollView: require('react-native').ScrollView,
    State: {},
  };
});

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

jest.mock('expo-location', () => ({
  __esModule: true,
  requestForegroundPermissionsAsync: jest.fn(),
  getCurrentPositionAsync: jest.fn(),
}));
