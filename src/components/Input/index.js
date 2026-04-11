import { forwardRef } from 'react';
import { InputNormal, InputMask } from './styles';

function Input({ masked, error, ...props }, ref) {
  const Component = !masked ? InputNormal : InputMask;

  /* eslint-disable-next-line react/jsx-props-no-spreading */
  return <Component error={error} ref={ref} {...props} />;
}

export default forwardRef(Input);
