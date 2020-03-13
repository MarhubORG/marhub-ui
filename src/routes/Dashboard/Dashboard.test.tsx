import React from 'react';
import renderer from 'react-test-renderer';
import {
  UnconnectedDashboard,
  mapStateToProps,
  mapDispatchToProps,
  MapDispatchToProps,
} from './Dashboard';
import { RegistrationState } from '../../types/interfaces';
import { exportingIrapData } from '../../redux/actions/api';

it('renders correctly when logged in', () => {
  const tree = renderer
    .create(
      <UnconnectedDashboard isLoggedIn exportingIrapData={exportingIrapData} />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly when not logged in', () => {
  const tree = renderer
    .create(
      <UnconnectedDashboard isLoggedIn exportingIrapData={exportingIrapData} />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

describe('mapStateToProps', () => {
  it('contains registration state', () => {
    const initialState: RegistrationState = {
      loading: false,
      isLoggedIn: false,
      redirect: false,
      loginRedirect: false,
      error: '',
    };
    expect(mapStateToProps({ registration: initialState })).toBeDefined();
    expect(mapStateToProps({ registration: initialState }).isLoggedIn).toEqual(
      false
    );
  });
});

describe('mapDispatchToProps', () => {
  it('contains a function called exportingIrapData', () => {
    const dispatch = jest.fn();
    const dispatches: MapDispatchToProps = mapDispatchToProps(dispatch);
    expect(Object.keys(dispatches).includes('exportingIrapData')).toBeTruthy();
    expect(typeof dispatches.exportingIrapData).toEqual('function');
    expect(dispatches.exportingIrapData.name).toEqual('exportingIrapData');
    expect(dispatches.exportingIrapData()).toBeUndefined();
  });
});
