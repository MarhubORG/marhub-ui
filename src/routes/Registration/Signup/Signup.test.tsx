import React from 'react';
import renderer from 'react-test-renderer';
import {
  UnconnectedSignup,
  mapDispatchToProps,
  MapDispatchToProps,
} from './Signup';
import { Action } from '../../../types/interfaces';

const action = {
  type: 'action',
};

function actionFunction(): Action {
  return action;
}

it('renders correctly', () => {
  const tree = renderer
    .create(
      <UnconnectedSignup
        signupRedirecting={actionFunction}
        signup={actionFunction}
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
  });
  it('contains a function called signupRedirecting', () => {
    const dispatch = jest.fn();
    const dispatches: MapDispatchToProps = mapDispatchToProps(dispatch);
    expect(Object.keys(dispatches).includes('signupRedirecting')).toBeTruthy();
    expect(typeof dispatches.signupRedirecting).toEqual('function');
    expect(dispatches.signupRedirecting.name).toEqual('signupRedirecting');
  });
});
