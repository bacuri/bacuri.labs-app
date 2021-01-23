import React from 'react';
import { HeaderBar } from './styles';

import Logo from '../../assets/logo.svg';
import Edge from '../../assets/canto.svg';

function Header({ rightSide }) {
  return (
    <>
      <Edge
        width="200"
        height="120"
        style={{ position: 'absolute', top: 0, right: 0 }}
      />
      <HeaderBar>
        <Logo width="120" height="120" />

        {!!rightSide && rightSide()}
      </HeaderBar>
    </>
  );
}

export default Header;
