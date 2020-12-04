import React from 'react';
import { HeaderBar, Logo, Edge } from './styles';

function Header({ RightSide }) {
  return (
    <>
      <Edge />
      <HeaderBar>
        <Logo />

        <RightSide />
      </HeaderBar>
    </>
  );
}

export default Header;
