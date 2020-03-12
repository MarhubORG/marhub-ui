import React from 'react';
import renderer from 'react-test-renderer';
import TextInput from './TextInput';

it('renders correctly', () => {
  const tree = renderer
    .create(
      <TextInput
        htmlFor="organization"
        labelText="Organization:"
        placeholder="Organization"
        name="organization"
        value="val"
        onChange={jest.fn()}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
