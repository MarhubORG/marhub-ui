import React from 'react';
import renderer from 'react-test-renderer';
import {
  UnconnectedOrganizationExportTemplate,
  mapDispatchToProps,
  MapDispatchToProps,
} from './OrganizationExportTemplate';
import { updateOrganization } from '../../../redux/actions/dashboard';

it('renders correctly', () => {
  const tree = renderer
    .create(
      <UnconnectedOrganizationExportTemplate
        updateOrganization={updateOrganization}
        organizations={[]}
        errorMessage=""
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

describe('mapDispatchToProps', () => {
  it('contains a function called updateOrganization', () => {
    const dispatch = jest.fn();
    const dispatches: MapDispatchToProps = mapDispatchToProps(dispatch);
    expect(Object.keys(dispatches).includes('updateOrganization')).toBeTruthy();
    expect(typeof dispatches.updateOrganization).toEqual('function');
    expect(dispatches.updateOrganization.name).toEqual('updateOrganization');
  });
});
