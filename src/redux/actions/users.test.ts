import {
  CREATE_USER,
  CREATE_USER_FAILURE,
  CREATE_USER_SUCCESS,
  FETCH_USERS,
  FETCH_USERS_FAILURE,
  FETCH_USERS_SUCCESS,
  EDIT_USER,
  EDIT_USER_FAILURE,
  EDIT_USER_SUCCESS,
  LOGOUT,
} from '../constants/actionTypes';

import {
  createUser,
  createUserFailure,
  createUserSuccess,
  editUser,
  editUserFailure,
  editUserSuccess,
  fetchUsers,
  fetchUsersFailure,
  fetchUsersSuccess,
  logout,
} from './users';

describe('logout', () => {
  it('should have a properly formatted action', () => {
    const expected = {
      type: LOGOUT,
    };
    expect(logout()).toEqual(expected);
  });
});

describe('createUser', () => {
  it('should have a properly formatted action', () => {
    const payload = {
      name: 'name',
      email: 'email',
      selectedOrganization: '3',
      role: 'ADMIN',
      password: 'password', // TEST BY HAND if we can change password
      isDisabled: false, // TEST BY HAND of we can set disabled
    };

    const expected = {
      type: CREATE_USER,
      payload,
    };
    expect(createUser(payload)).toEqual(expected);
  });
});

describe('createUserFailure', () => {
  it('should have a properly formatted action', () => {
    const expected = {
      type: CREATE_USER_FAILURE,
    };
    expect(createUserFailure()).toEqual(expected);
  });
});

describe('createUserSuccess', () => {
  it('should have a properly formatted action', () => {
    const payload = {
      id: 1,
      email: 'email',
      isDisabled: false,
      profile: {
        name: 'name',
        role: 'role',
        organisation: '4',
      },
    };
    const expected = {
      type: CREATE_USER_SUCCESS,
      payload,
    };
    expect(createUserSuccess(payload)).toEqual(expected);
  });
});

describe('fetchUsers', () => {
  it('should have a properly formatted action', () => {
    const expected = {
      type: FETCH_USERS,
    };
    expect(fetchUsers()).toEqual(expected);
  });
});

describe('fetchUsersFailure', () => {
  it('should have a properly formatted action', () => {
    const expected = {
      type: FETCH_USERS_FAILURE,
    };
    expect(fetchUsersFailure()).toEqual(expected);
  });
});

describe('fetchUsersSuccess', () => {
  it('should have a properly formatted action', () => {
    const payload = [
      {
        id: 1,
        email: 'email',
        isDisabled: false,
        profile: {
          name: 'name',
          role: 'role',
          organisation: '4',
        },
      },
    ];
    const expected = {
      type: FETCH_USERS_SUCCESS,
      payload,
    };
    expect(fetchUsersSuccess(payload)).toEqual(expected);
  });
});

describe('editUser', () => {
  it('should have a properly formatted action', () => {
    const payload = {
      email: 'email',
      name: 'name',
      selectedOrganization: '4',
      role: 'user',
      password: '1234',
      isDisabled: false,
      id: 1,
    };

    const expected = {
      type: EDIT_USER,
      payload,
    };
    expect(editUser(payload)).toEqual(expected);
  });
});

describe('editUserFailure', () => {
  it('should have a properly formatted action', () => {
    const expected = {
      type: EDIT_USER_FAILURE,
    };
    expect(editUserFailure()).toEqual(expected);
  });
});

describe('editUserSuccess', () => {
  it('should have a properly formatted action', () => {
    const payload = {
      id: 1,
      email: 'email',
      isDisabled: false,
      profile: {
        name: 'name',
        role: 'role',
        organisation: '4',
      },
    };
    const expected = {
      type: EDIT_USER_SUCCESS,
      payload,
    };
    expect(editUserSuccess(payload)).toEqual(expected);
  });
});
