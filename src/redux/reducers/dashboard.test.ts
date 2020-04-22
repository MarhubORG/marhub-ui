import dashboardReducer, {
  initialState,
  standardFetchOrganizationErrorMessage,
  successMessage,
} from './dashboard';

import {
  FETCH_ORGANIZATIONS,
  FETCH_ORGANIZATIONS_FAILURE,
  FETCH_ORGANIZATIONS_SUCCESS,
  UPDATE_ORGANIZATION,
  UPDATE_ORGANIZATION_FAILURE,
  UPDATE_ORGANIZATION_SUCCESS,
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
      organization: {
        id: 1,
        organisation: {
          visible_fields: ['age', 'current_country'],
          name: 'Org name',
        },
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
        id: 1,
        organisation: {
          visible_fields: ['age', 'current_country'],
          name: 'Org name',
        },
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
          visible_fields: ['id, age'],
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
});
