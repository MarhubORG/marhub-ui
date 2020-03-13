import React from 'react';
import renderer from 'react-test-renderer';
import {
  UnconnectedSignup,
  mapDispatchToProps,
  MapDispatchToProps,
  mapStateToProps,
} from './Signup';
import { initialState } from '../../../redux/reducers/registration';
import { signup, signupRedirecting } from '../../../redux/actions/index';

it('renders correctly', () => {
  const tree = renderer
    .create(
      <UnconnectedSignup
        signupRedirecting={signupRedirecting}
        signup={signup}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

describe('mapDispatchToProps', () => {
  it('contains a function called signup', () => {
    const dispatch = jest.fn();
    const dispatches: MapDispatchToProps = mapDispatchToProps(dispatch);
    expect(Object.keys(dispatches).includes('signup')).toBeTruthy();
    expect(typeof dispatches.signup).toEqual('function');
    expect(dispatches.signup.name).toEqual('signup');
    expect(dispatches.signup('a', 'b', 'c', 'd')).toBeUndefined();
  });
  it('contains a function called signupRedirecting', () => {
    const dispatch = jest.fn();
    const dispatches: MapDispatchToProps = mapDispatchToProps(dispatch);
    expect(Object.keys(dispatches).includes('signupRedirecting')).toBeTruthy();
    expect(typeof dispatches.signupRedirecting).toEqual('function');
    expect(dispatches.signupRedirecting.name).toEqual('signupRedirecting');
    expect(dispatches.signupRedirecting()).toBeUndefined();
  });
});

describe('mapStateToProps', () => {
  it('contains registration state', () => {
    expect(mapStateToProps({ registration: initialState })).toBeDefined();
    expect(
      mapStateToProps({ registration: initialState }).registration.loading
    ).toEqual(false);
  });
});
