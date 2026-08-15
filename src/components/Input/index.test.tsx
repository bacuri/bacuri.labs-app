/* eslint-disable camelcase */
import { TextInput } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';

import Input from '.';

describe('Input', () => {
  it('renders a plain text input when not masked', () => {
    const { UNSAFE_getByType } = render(<Input placeholder="Name" />);

    expect(UNSAFE_getByType(TextInput)).toBeTruthy();
  });

  it('forwards text input props', () => {
    const onChangeText = jest.fn();
    const { getByPlaceholderText } = render(
      <Input placeholder="Name" onChangeText={onChangeText} />,
    );

    fireEvent.changeText(getByPlaceholderText('Name'), 'John');

    expect(onChangeText).toHaveBeenCalledWith('John');
  });

  it('renders a masked input when masked is true', () => {
    const { UNSAFE_getByType } = render(<Input masked type="cpf" />);

    expect(UNSAFE_getByType(TextInput)).toBeTruthy();
  });
});
