import { forwardRef } from 'react';
import type { ComponentType } from 'react';
import type { TextInputProps } from 'react-native';
import { InputNormal, InputMask } from './styles';

interface InputProps extends TextInputProps {
  masked?: boolean;
  error?: boolean;
  type?: string;
  options?: Record<string, unknown>;
}

function Input({ masked, error, ...props }: InputProps, ref: any) {
  const Component = (!masked ? InputNormal : InputMask) as ComponentType<any>;

  /* eslint-disable-next-line react/jsx-props-no-spreading */
  return <Component error={error} ref={ref} {...props} />;
}

export default forwardRef(Input);
