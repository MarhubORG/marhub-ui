// import React from 'react';
// import renderer from 'react-test-renderer';
import { UnconnectedDashboard, mapStateToProps } from './Dashboard';
import { initialState } from '../../redux/reducers/registration';

// it('renders correctly when logged in', () => {
//   const tree = renderer.create(<UnconnectedDashboard isLoggedIn />).toJSON();
//   expect(tree).toMatchSnapshot();
// });

// it('renders correctly when not logged in', () => {
//   const tree = renderer.create(<UnconnectedDashboard isLoggedIn />).toJSON();
//   expect(tree).toMatchSnapshot();
// });

describe('mapStateToProps', () => {
  it('contains registration state', () => {
    expect(mapStateToProps({ registration: initialState })).toBeDefined();
    expect(mapStateToProps({ registration: initialState }).isLoggedIn).toEqual(
      false
    );
  });
});
