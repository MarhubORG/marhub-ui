import {
  FETCH_ORGANIZATIONS,
  FETCH_ORGANIZATIONS_FAILURE,
  FETCH_ORGANIZATIONS_SUCCESS,
  LOGOUT,
  UPDATE_ORGANIZATION,
  UPDATE_ORGANIZATION_FAILURE,
  UPDATE_ORGANIZATION_SUCCESS,
  CREATE_TEMPLATE_SUCCESS,
  CREATE_TEMPLATE_FAILURE,
  CREATE_TEMPLATE,
  CREATE_ORGANIZATION_REDIRECT,
  CREATE_ORGANIZATION_SUCCESS,
  CREATE_ORGANIZATION_FAILURE,
  CREATE_ORGANIZATION,
} from '../constants/actionTypes';

import {
  fetchOrganizations,
  fetchOrganizationsSuccess,
  fetchOrganizationsFailure,
  logout,
  updateOrganization,
  updateOrganizationSuccess,
  updateOrganizationFailure,
  createTemplateSuccess,
  createTemplateFailure,
  createTemplate,
  createOrganizationRedirect,
  createOrganizationSuccess,
  createOrganizationFailure,
  createOrganization,
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
      organisation: {
        visibleFields: ['age', 'current_country'],
        name: 'Org name',
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
    // TODO text by hand
    const payload = {
      organization: {
        name: 'test name',
        visible_fields: ['id, age'],
      },
      id: 1,
    };

    const expected = {
      type: UPDATE_ORGANIZATION,
      payload,
    };

    expect(updateOrganization(payload)).toEqual(expected);
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
          visibleFields: ['id, age'],
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

describe('createTemplateSuccess', () => {
  it('should have a properly formatted action', () => {
    const payload = {
      organisation: {
        name: 'test name',
        visibleFields: ['id, age'],
      },
      id: 1,
    };
    const expected = {
      type: CREATE_TEMPLATE_SUCCESS,
      payload,
    };
    expect(createTemplateSuccess(payload)).toEqual(expected);
  });
});

describe('createTemplateFailure', () => {
  it('should have a properly formatted action', () => {
    const expected = {
      type: CREATE_TEMPLATE_FAILURE,
    };
    expect(createTemplateFailure()).toEqual(expected);
  });
});

describe('createTemplate', () => {
  it('should have a properly formatted action', () => {
    const payload = {
      name: 'first template',
      fields: ['a', 'b', 'c'],
    };

    const expected = {
      type: CREATE_TEMPLATE,
      payload,
    };
    expect(createTemplate(payload)).toEqual(expected);
  });
});

describe('createOrganizationRedirect', () => {
  it('should have a properly formatted action', () => {
    const expected = {
      type: CREATE_ORGANIZATION_REDIRECT,
    };
    expect(createOrganizationRedirect()).toEqual(expected);
  });
});

describe('createOrganizationSuccess', () => {
  it('should have a properly formatted action', () => {
    const payload = {
      id: 1,
      organisation: {
        visibleFields: ['age', 'current_country'],
        name: 'Org name',
      },
    };

    const expected = {
      type: CREATE_ORGANIZATION_SUCCESS,
      payload,
    };
    expect(createOrganizationSuccess(payload)).toEqual(expected);
  });
});

describe('createOrganizationFailure', () => {
  it('should have a properly formatted action', () => {
    const expected = {
      type: CREATE_ORGANIZATION_FAILURE,
    };
    expect(createOrganizationFailure()).toEqual(expected);
  });
});

describe('createOrganization', () => {
  it('should have a properly formatted action', () => {
    const payload = 'payload';
    const expected = {
      type: CREATE_ORGANIZATION,
      payload,
    };
    expect(createOrganization(payload)).toEqual(expected);
  });
});
