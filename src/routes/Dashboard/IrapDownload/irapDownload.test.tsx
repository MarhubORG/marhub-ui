import React from 'react';
import renderer from 'react-test-renderer';
import {
  UnconnectedIrapDownload,
  mapDispatchToProps,
  MapDispatchToProps,
} from './irapDownload';
import { exportingIrapData } from '../../../redux/actions/api';

it('renders correctly when logged in', () => {
  const tree = renderer
    .create(<UnconnectedIrapDownload exportingIrapData={exportingIrapData} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

describe('mapDispatchToProps', () => {
  it('contains a function called exportingIrapData', () => {
    const startDate = '03/01/2020';
    const endDate = '04/01/2020';
    const dispatch = jest.fn();
    const dispatches: MapDispatchToProps = mapDispatchToProps(dispatch);
    expect(Object.keys(dispatches).includes('exportingIrapData')).toBeTruthy();
    expect(typeof dispatches.exportingIrapData).toEqual('function');
    expect(dispatches.exportingIrapData.name).toEqual('exportingIrapData');
    expect(
      dispatches.exportingIrapData({ startDate, endDate })
    ).toBeUndefined();
  });
});
