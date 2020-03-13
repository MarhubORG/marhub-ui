import React from 'react';
import renderer from 'react-test-renderer';
import DatePicker from './DatePicker';

it('renders correctly', () => {
  const d = new Date();
  d.setFullYear(2020);
  d.setMonth(3);
  d.setDate(1);
  const tree = renderer
    .create(<DatePicker value={d} onChange={(): void => {}} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
