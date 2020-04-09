import React from 'react';
import renderer from 'react-test-renderer';
import {
  UnconnectedOrganizationExportTemplate,
  mapDispatchToProps,
  MapDispatchToProps,
  mapStateToProps,
} from './OrganizationExportTemplate';
import { updateOrganization } from '../../../redux/actions/dashboard';
import { initialState } from '../../../redux/reducers/dashboard';
import { DashboardState } from '../../../types/interfaces';

it('renders correctly', () => {
  const tree = renderer
    .create(
      <UnconnectedOrganizationExportTemplate
        updateOrganization={updateOrganization}
        organizations={[]}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

describe('mapDispatchToProps', () => {
  it('contains a function called updateOrganization', () => {
    const organization = {
      id: 1,
      organization: {
        id: 1,
        organisation: {
          visible_fields: ['age', 'current_country'],
          name: 'Org name',
        },
      },
    };
    const dispatch = jest.fn();
    const dispatches: MapDispatchToProps = mapDispatchToProps(dispatch);
    expect(Object.keys(dispatches).includes('updateOrganization')).toBeTruthy();
    expect(typeof dispatches.updateOrganization).toEqual('function');
    expect(dispatches.updateOrganization.name).toEqual('updateOrganization');
    expect(dispatches.updateOrganization(organization)).toBeUndefined();
  });
});
