import styled from 'styled-components';
import SvgUri from 'react-native-svg-uri';

import logo from '../../assets/logo.svg';
import edge from '../../assets/canto.svg';

export const Logo = styled(SvgUri).attrs({
  width: '120',
  height: '120',
  source: logo,
})``;

export const HeaderBar = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 40px;
`;

export const Edge = styled(SvgUri).attrs({
  width: '200',
  height: '120',
  source: edge,
})`
  position: absolute;
  top: 0;
  right: 0;
`;
