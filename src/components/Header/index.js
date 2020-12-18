import React from 'react';
import { HeaderBar, Logo, Edge } from './styles';

function Header({ rightSide }) {
  return (
    <>
      <Edge />
      <HeaderBar>
        <Logo />

        {!!rightSide && rightSide()}
      </HeaderBar>
    </>
  );
}

export default Header;
