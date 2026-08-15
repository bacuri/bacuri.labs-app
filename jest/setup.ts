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
