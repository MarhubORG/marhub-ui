import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/learn react/i);
  const testJest = getByText(/test jest/i);

  expect(linkElement).toBeInTheDocument();
  expect(testJest).toBeInTheDocument();
});
