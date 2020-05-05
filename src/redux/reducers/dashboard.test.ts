import dashboardReducer, {
  initialState,
  standardFetchOrganizationErrorMessage,
  successMessage,
  templateFailureMessage,
  templateSuccessMessage,
  createOrgFailureMessage,
  createOrgSuccessMessage,
  replaceWithUpdatedOrg,
} from './dashboard';

import {
  FETCH_ORGANIZATIONS,
  FETCH_ORGANIZATIONS_FAILURE,
  FETCH_ORGANIZATIONS_SUCCESS,
  UPDATE_ORGANIZATION,
  UPDATE_ORGANIZATION_FAILURE,
  UPDATE_ORGANIZATION_SUCCESS,
  CREATE_ORGANIZATION,
  CREATE_ORGANIZATION_FAILURE,
  CREATE_ORGANIZATION_REDIRECT,
  CREATE_ORGANIZATION_SUCCESS,
  CREATE_TEMPLATE,
  CREATE_TEMPLATE_FAILURE,
  CREATE_TEMPLATE_SUCCESS,
  LOGOUT,
} from '../constants/actionTypes';

describe('dashboardReducer', () => {
  it('handles default', () => {
    const state = dashboardReducer(initialState, {
      type: 'SOMETHING ELSE',
    });
    expect(state).toEqual(initialState);
  });
  it('handles LOGOUT action type', () => {
    const state = dashboardReducer(initialState, {
      type: LOGOUT,
    });
    expect(state).toEqual(initialState);
  });
  it('handles UPDATE_ORGANIZATION_SUCCESS action type', () => {
    const organization = {
      id: 1,
      organisation: {
        visibleFields: ['age', 'current_country'],
        name: 'Org name',
      },
    };

    const expected = {
      loading: false,
      organizations: [],
      errorMessage: successMessage,
      redirectToVisibleFields: '',
      templateMessage: '',
    };

    const state = dashboardReducer(initialState, {
      type: UPDATE_ORGANIZATION_SUCCESS,
      payload: organization,
    });

    expect(state).toEqual(expected);
  });
  it('handles UPDATE_ORGANIZATION_FAILURE action type', () => {
    const message = 'message';
    const state = dashboardReducer(initialState, {
      type: UPDATE_ORGANIZATION_FAILURE,
      payload: message,
    });
    const expected = {
      loading: false,
      organizations: [],
      errorMessage: message,
      redirectToVisibleFields: '',
      templateMessage: '',
    };

    expect(state).toEqual(expected);
  });
  it('handles UPDATE_ORGANIZATION action type', () => {
    const organization = {
      id: 1,
      organization: {
        visible_fields: ['age', 'current_country'],
      },
    };

    const state = dashboardReducer(initialState, {
      type: UPDATE_ORGANIZATION,
      payload: organization,
    });

    const expected = {
      loading: true,
      organizations: [],
      errorMessage: '',
      redirectToVisibleFields: '',
      templateMessage: '',
    };
    expect(state).toEqual(expected);
  });
  it('handles FETCH_ORGANIZATIONS action type', () => {
    const state = dashboardReducer(initialState, {
      type: FETCH_ORGANIZATIONS,
    });
    const expected = {
      loading: true,
      organizations: [],
      errorMessage: '',
      redirectToVisibleFields: '',
      templateMessage: '',
    };
    expect(state).toEqual(expected);
  });
  it('handles FETCH_ORGANIZATIONS_FAILURE', () => {
    const state = dashboardReducer(initialState, {
      type: FETCH_ORGANIZATIONS_FAILURE,
    });
    const expected = {
      loading: false,
      organizations: [],
      errorMessage: standardFetchOrganizationErrorMessage,
      redirectToVisibleFields: '',
      templateMessage: '',
    };
    expect(state).toEqual(expected);
  });

  it('handles FETCH_ORGANIZATIONS_SUCCESS', () => {
    const organizations = [
      {
        organisation: {
          name: 'test name',
          visibleFields: ['id, age'],
        },
        id: 1,
      },
    ];
    const state = dashboardReducer(initialState, {
      type: FETCH_ORGANIZATIONS_SUCCESS,
      payload: organizations,
    });
    const expected = {
      loading: false,
      organizations,
      errorMessage: '',
      redirectToVisibleFields: '',
      templateMessage: '',
    };
    expect(state).toEqual(expected);
  });

  it('handles CREATE_ORGANIZATION', () => {
    const payload = 'payload';
    const state = dashboardReducer(initialState, {
      type: CREATE_ORGANIZATION,
      payload,
    });

    const expected = {
      ...initialState,
      loading: true,
      errorMessage: '',
    };
    expect(state).toEqual(expected);
  });

  it('handles CREATE_ORGANIZATION_FAILURE', () => {
    const state = dashboardReducer(initialState, {
      type: CREATE_ORGANIZATION_FAILURE,
    });
    const expected = {
      ...initialState,
      loading: false,
      errorMessage: createOrgFailureMessage,
    };
    expect(state).toEqual(expected);
  });

  it('handles CREATE_ORGANIZATION_SUCCESS', () => {
    const payload = {
      id: 1,
      organisation: {
        visibleFields: ['age', 'current_country'],
        name: 'Org name',
      },
    };
    const state = dashboardReducer(initialState, {
      type: CREATE_ORGANIZATION_SUCCESS,
      payload,
    });

    const expected = {
      ...initialState,
      organizations: [...initialState.organizations, payload],
      loading: false,
      errorMessage: createOrgSuccessMessage,
      redirectToVisibleFields: payload.organisation.name,
    };

    expect(state).toEqual(expected);
  });

  it('handles CREATE_ORGANIZATION_REDIRECT', () => {
    const state = dashboardReducer(initialState, {
      type: CREATE_ORGANIZATION_REDIRECT,
    });
    const expected = {
      ...initialState,
      redirectToVisibleFields: '',
    };
    expect(state).toEqual(expected);
  });

  it('handles CREATE_TEMPLATE', () => {
    const payload = {
      name: 'name',
      fields: ['fields'],
    };
    const state = dashboardReducer(initialState, {
      type: CREATE_TEMPLATE,
      payload,
    });
    const expected = {
      ...initialState,
      loading: true,
      templateMessage: '',
    };
    expect(state).toEqual(expected);
  });

  it('handles CREATE_TEMPLATE_SUCCESS', () => {
    const payload = {
      id: 1,
      organisation: {
        visibleFields: ['age', 'current_country'],
        name: 'Org name',
      },
    };
    const state = dashboardReducer(initialState, {
      type: CREATE_TEMPLATE_SUCCESS,
      payload,
    });
    const expected = {
      ...initialState,
      loading: false,
      templateMessage: templateSuccessMessage,
      organizations: replaceWithUpdatedOrg(payload, initialState), // TODO TEST BY HAND
    };
    expect(state).toEqual(expected);
  });

  it('handles CREATE_TEMPLATE_FAILURE', () => {
    const state = dashboardReducer(initialState, {
      type: CREATE_TEMPLATE_FAILURE,
    });
    const expected = {
      ...initialState,
      templateMessage: templateFailureMessage,
      loading: false,
    };
    expect(state).toEqual(expected);
  });
});
