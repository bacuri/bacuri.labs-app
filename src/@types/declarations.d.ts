declare module 'base-64' {
  export function encode(input: string): string;
  export function decode(input: string): string;
}

declare module '*.svg' {
  import type { ComponentType } from 'react';
  import type { SvgProps } from 'react-native-svg';

  const content: ComponentType<SvgProps>;
  export default content;
}

declare module 'react-native-masked-text' {
  import type { ComponentType } from 'react';
  import type { TextInputProps } from 'react-native';

  export interface TextInputMaskProps extends TextInputProps {
    type?: string;
    options?: Record<string, unknown>;
  }

  export const TextInputMask: ComponentType<TextInputMaskProps>;
}
