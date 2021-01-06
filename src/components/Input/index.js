import React, { forwardRef } from 'react';
import { InputNormal, InputMask } from './styles';

function Input({ masked, error, ...props }, ref) {
  const Component = !masked ? InputNormal : InputMask;

  return <Component error={error} ref={ref} {...props} />;
}

export default forwardRef(Input);
