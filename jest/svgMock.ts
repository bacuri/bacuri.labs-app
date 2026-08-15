import React from 'react';
import { View } from 'react-native';
import type { ViewProps } from 'react-native';

function SvgMock(props: ViewProps) {
  return React.createElement(View, props);
}

export default SvgMock;
