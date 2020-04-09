import React from 'react';
import renderer from 'react-test-renderer';
import {
  UnconnectedLogin,
  mapStateToProps,
  mapDispatchToProps,
  MapDispatchToProps,
} from './Login';
import { login, loginRedirecting } from '../../../redux/actions/index';
import { initialState } from '../../../redux/reducers/registration';

it('renders correctly', () => {
  const tree = renderer
    .create(
      <UnconnectedLogin
        login={login}
        registration={initialState}
        loginRedirecting={loginRedirecting}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

describe('mapDispatchToProps', () => {
  it('contains a function called login', () => {
    const dispatch = jest.fn();
    const dispatches: MapDispatchToProps = mapDispatchToProps(dispatch);
    expect(Object.keys(dispatches).includes('login')).toBeTruthy();
    expect(typeof dispatches.login).toEqual('function');
    expect(dispatches.login.name).toEqual('login');
    expect(dispatches.login('a', 'b')).toBeUndefined();
  });
  it('contains a function called loginRedirecting', () => {
    const dispatch = jest.fn();
    const dispatches: MapDispatchToProps = mapDispatchToProps(dispatch);
    expect(Object.keys(dispatches).includes('loginRedirecting')).toBeTruthy();
    expect(typeof dispatches.loginRedirecting).toEqual('function');
    expect(dispatches.loginRedirecting.name).toEqual('loginRedirecting');
    expect(dispatches.loginRedirecting()).toBeUndefined();
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
