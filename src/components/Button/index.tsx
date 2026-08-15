import { ActivityIndicator } from 'react-native';
import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { ButtonBody, ButtonText } from './styles';

interface ButtonProps {
  children: ReactNode;
  onPress: () => void;
  color?: string | undefined;
  disabled?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
}

function Button(props: ButtonProps) {
  const {
    children,
    onPress,
    color,
    disabled = false,
    loading = false,
    style,
  } = props;

  return (
    <ButtonBody
      style={style}
      color={color}
      onPress={onPress}
      enabled={!loading && !disabled}
    >
      {!loading ? (
        <ButtonText>{children}</ButtonText>
      ) : (
        <ActivityIndicator color="#fff" />
      )}
    </ButtonBody>
  );
}

export default Button;
