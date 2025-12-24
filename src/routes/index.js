import SignOutStack from './SignOutStack';
import SignInStack from './SignInStack';

import { useAuth } from '../contexts/auth';

function Routes() {
  const { signed } = useAuth();

  return !signed ? <SignOutStack /> : <SignInStack />;
}

export default Routes;
