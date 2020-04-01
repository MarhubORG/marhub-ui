import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { UnconnectedDashboard, mapStateToProps } from './Dashboard';
import { initialState } from '../../redux/reducers/registration';

const mockStore = configureMockStore();
const store = mockStore({ registration: initialState });

it('renders correctly when logged in', () => {
  const tree = renderer
    .create(
      <Provider store={store}>
        <UnconnectedDashboard isLoggedIn />
      </Provider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly when not logged in', () => {
  const tree = renderer
    .create(
      <Provider store={store}>
        <UnconnectedDashboard isLoggedIn />
      </Provider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

describe('mapStateToProps', () => {
  it('contains registration state', () => {
    expect(mapStateToProps({ registration: initialState })).toBeDefined();
    expect(mapStateToProps({ registration: initialState }).isLoggedIn).toEqual(
      false
    );
  });
});
