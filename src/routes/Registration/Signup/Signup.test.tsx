import React from 'react';
import renderer from 'react-test-renderer';
import {
  UnconnectedSignup,
  mapDispatchToProps,
  MapDispatchToProps,
} from './Signup';

it('renders correctly', () => {
  const tree = renderer.create(<UnconnectedSignup />).toJSON();
  expect(tree).toMatchSnapshot();
});

describe('mapDispatchToProps', () => {
  it('contains a function called signup', () => {
    const dispatch = jest.fn();
    const dispatches: MapDispatchToProps = mapDispatchToProps(dispatch);
    expect(Object.keys(dispatches).includes('signup')).toBeTruthy();
    expect(typeof dispatches.signup).toEqual('function');
    expect(dispatches.signup.name).toEqual('signup');
  });
});
