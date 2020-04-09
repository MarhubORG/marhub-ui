import {
  FETCH_ORGANIZATIONS,
  FETCH_ORGANIZATIONS_FAILURE,
  FETCH_ORGANIZATIONS_SUCCESS,
  LOGOUT,
  UPDATE_ORGANIZATION,
  UPDATE_ORGANIZATION_FAILURE,
  UPDATE_ORGANIZATION_SUCCESS,
} from '../constants/actionTypes';

import {
  fetchOrganizations,
  fetchOrganizationsSuccess,
  fetchOrganizationsFailure,
  logout,
  updateOrganization,
  updateOrganizationSuccess,
  updateOrganizationFailure,
} from './dashboard';

describe('logout', () => {
  it('should have a properly formatted action', () => {
    const expected = {
      type: LOGOUT,
    };
    expect(logout()).toEqual(expected);
  });
});

describe('updateOrganizationFailure', () => {
  it('should have a properly formatted action', () => {
    const message = 'failure message';
    const expected = {
      type: UPDATE_ORGANIZATION_FAILURE,
      payload: message,
    };
    expect(updateOrganizationFailure(message)).toEqual(expected);
  });
});

describe('updateOrganizationSuccess', () => {
  it('should have a properly formatted action', () => {
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
    const expected = {
      type: UPDATE_ORGANIZATION_SUCCESS,
      payload: organization,
    };

    expect(updateOrganizationSuccess(organization)).toEqual(expected);
  });
});

describe('updateOrganization', () => {
  it('should have a properly formatted action', () => {
    // TODO Do we want id twice?
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

    const expected = {
      type: UPDATE_ORGANIZATION,
      payload: organization,
    };

    expect(updateOrganization(organization)).toEqual(expected);
  });
});

describe('fetchOrganizations', () => {
  it('should have a properly formatted action', () => {
    const expected = {
      type: FETCH_ORGANIZATIONS,
    };
    expect(fetchOrganizations()).toEqual(expected);
  });
});

describe('fetchOrganizationsSuccess', () => {
  it('should have a properly formatted action', () => {
    const organizations = [
      {
        organisation: {
          name: 'test name',
          visible_fields: ['id, age'],
        },
        id: 1,
      },
    ];

    const expected = {
      type: FETCH_ORGANIZATIONS_SUCCESS,
      payload: organizations,
    };

    expect(fetchOrganizationsSuccess(organizations)).toEqual(expected);
  });
});

describe('fetchOrganizationsFailure', () => {
  it('should have a properly formatted action', () => {
    const expected = {
      type: FETCH_ORGANIZATIONS_FAILURE,
    };
    expect(fetchOrganizationsFailure()).toEqual(expected);
  });
});
