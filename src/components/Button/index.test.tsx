import { ActivityIndicator } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';

import Button from '.';

describe('Button', () => {
  it('renders its children', () => {
    const { getByText } = render(<Button onPress={() => {}}>Submit</Button>);

    expect(getByText('Submit')).toBeTruthy();
  });

  it('shows a loading indicator instead of children while loading', () => {
    const { queryByText, UNSAFE_getByType } = render(
      <Button onPress={() => {}} loading>
        Submit
      </Button>,
    );

    expect(queryByText('Submit')).toBeNull();

    expect(UNSAFE_getByType(ActivityIndicator)).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPress = jest.fn();
    const { getByText } = render(<Button onPress={onPress}>Submit</Button>);

    fireEvent.press(getByText('Submit'));

    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
