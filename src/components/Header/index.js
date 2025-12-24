import { HeaderBar } from './styles';

import Logo from '../../assets/logo.svg';
import Edge from '../../assets/canto.svg';

function Header({ RightSide }) {
  return (
    <>
      <Edge
        width="300"
        height="180"
        style={{ position: 'absolute', top: 0, right: 0 }}
      />
      <HeaderBar>
        <Logo width="94" height="150" />

        <RightSide />
      </HeaderBar>
    </>
  );
}

export default Header;
