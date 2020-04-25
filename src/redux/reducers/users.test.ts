import {
  FETCH_USERS,
  FETCH_USERS_FAILURE,
  FETCH_USERS_SUCCESS,
  CREATE_USER,
  CREATE_USER_FAILURE,
  CREATE_USER_SUCCESS,
  EDIT_USER,
  EDIT_USER_FAILURE,
  EDIT_USER_SUCCESS,
  LOGOUT,
} from '../constants/actionTypes';

import userReducer, {
  failureMessage,
  createUserFailureMessage,
  editUserFailureMessage,
  editUserSuccessMessage,
  initialState,
  replaceWithUpdatedUser,
} from './users';

describe('userReducer', () => {
  it('handles FETCH_USER', () => {
    const state = userReducer(initialState, {
      type: FETCH_USERS,
    });
    const expected = {
      ...initialState,
      loading: true,
      message: '',
    };
    expect(state).toEqual(expected);
  });
  it('handles FETCH_USERS_FAILURE', () => {
    const state = userReducer(initialState, {
      type: FETCH_USERS_FAILURE,
    });
    const expected = {
      ...initialState,
      loading: false,
      message: failureMessage,
    };
    expect(state).toEqual(expected);
  });
  it('handles FETCH_USERS_SUCCESS', () => {
    const payload = [
      {
        id: 1,
        email: 'email',
        isDisabled: false,
        profile: {
          name: 'name',
          organisation: '4',
          role: 'role',
        },
      },
    ];
    const state = userReducer(initialState, {
      type: FETCH_USERS_SUCCESS,
      payload,
    });
    const expected = {
      ...initialState,
      loading: false,
      message: '',
      users: payload,
    };
    expect(state).toEqual(expected);
  });
  it('handles CREATE_USER', () => {
    const payload = {
      id: 1,
      email: 'email',
      isDisabled: false,
      name: 'name',
      selectedOrganization: '4',
      role: 'role',
      password: 'pass',
    };
    const state = userReducer(initialState, {
      type: CREATE_USER,
      payload,
    });
    const expected = {
      ...initialState,
      loading: true,
      message: '',
    };
    expect(state).toEqual(expected);
  });
  it('handles CREATE_USER_FAILURE', () => {
    const state = userReducer(initialState, {
      type: CREATE_USER_FAILURE,
    });
    const expected = {
      ...initialState,
      loading: false,
      message: createUserFailureMessage,
    };
    expect(state).toEqual(expected);
  });
  it('handles CREATE_USER_SUCCESS', () => {
    const payload = {
      id: 1,
      email: 'email',
      isDisabled: false,
      profile: {
        name: 'name',
        organisation: '4',
        role: 'role',
      },
    };
    const state = userReducer(initialState, {
      type: CREATE_USER_SUCCESS,
      payload,
    });
    const expected = {
      ...initialState,
      loading: false,
      message: '',
      users: [payload],
    };
    expect(state).toEqual(expected);
  });
  it('handles EDIT_USER', () => {
    const payload = {
      id: 1,
      email: 'email',
      isDisabled: false,
      name: 'name',
      selectedOrganization: '4',
      role: 'role',
      password: 'pass',
    };
    const state = userReducer(initialState, {
      type: EDIT_USER,
      payload,
    });
    const expected = {
      ...initialState,
      loading: true,
      message: '',
    };
    expect(state).toEqual(expected);
  });
  it('handles EDIT_USER_FAILURE', () => {
    const state = userReducer(initialState, {
      type: EDIT_USER_FAILURE,
    });
    const expected = {
      ...initialState,
      loading: false,
      message: editUserFailureMessage,
    };
    expect(state).toEqual(expected);
  });
  it('handles EDIT_USER_SUCCESS', () => {
    const payload = {
      id: 1,
      email: 'email',
      isDisabled: false,
      profile: {
        name: 'name',
        organisation: '4',
        role: 'role',
      },
    };
    const state = userReducer(initialState, {
      type: EDIT_USER_SUCCESS,
      payload,
    });
    const expected = {
      ...initialState,
      loading: false,
      message: editUserSuccessMessage,
      users: replaceWithUpdatedUser(payload, initialState),
    };
    expect(state).toEqual(expected);
  });
  it('handles LOGOUT', () => {
    const updatedState = {
      message: 'message',
      users: [],
      loading: true,
    };

    const state = userReducer(updatedState, {
      type: LOGOUT,
    });

    const expected = initialState;
    expect(state).toEqual(expected);
  });
});
