import React from 'react';
import { ActivityIndicator } from 'react-native';
import { ButtonBody, ButtonText } from './styles';

const Button = props => {
  const { children, onPress, color, disabled = false, loading = false } = props;

  return (
    <ButtonBody color={color} onPress={onPress} enabled={!loading && !disabled}>
      {!loading ? (
        <ButtonText>{children}</ButtonText>
      ) : (
        <ActivityIndicator color="#fff" />
      )}
    </ButtonBody>
  );
};

export default Button;
