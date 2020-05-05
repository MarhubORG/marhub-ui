import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import cookie from 'react-cookies';

import {
  FETCH_ORGANIZATIONS,
  UPDATE_ORGANIZATION,
  CREATE_ORGANIZATION,
  CREATE_TEMPLATE,
  UPDATE_TEMPLATE,
  DELETE_TEMPLATE,
} from '../constants/actionTypes';
import {
  fetchOrganizationsSuccess,
  fetchOrganizationsFailure,
  FetchOrganizationsAction,
  UpdateOrganizationAction,
  updateOrganizationSuccess,
  updateOrganizationFailure,
  CreateOrganizationAction,
  createOrganizationFailure,
  createOrganizationSuccess,
  CreateTemplateAction,
  createTemplateFailure,
  createTemplateSuccess,
  UpdateTemplateAction,
  updateTemplateSuccess,
  updateTemplateFailure,
  DeleteTemplateAction,
  deleteTemplateSuccess,
  deleteTemplateFailure,
} from '../actions/dashboard';

function* fetchOrgs(action: FetchOrganizationsAction): object {
  try {
    const token = cookie.load('token');
    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const url = 'http://localhost:8080/api/v1/organisations';

    const json = yield axios.get(url, axiosConfig);
    yield put(fetchOrganizationsSuccess(json.data[0]));
  } catch (error) {
    // const errorMessage = `${error.request.status} Error: ${error.response.data.error}`;
    yield put(fetchOrganizationsFailure());
  }
}

export function* fetchOrganizationsWatcher(): object {
  yield takeLatest(FETCH_ORGANIZATIONS, fetchOrgs);
}

function* updateOrganization(action: UpdateOrganizationAction): object {
  try {
    const token = cookie.load('token');
    const url = 'http://localhost:8080/api/v1/exportation_fields';
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    const json = yield axios.post(url, {
      id: action.payload.id,
      organization: action.payload.organization,
    });
    yield put(updateOrganizationSuccess(json.data));
  } catch (error) {
    yield put(
      updateOrganizationFailure(
        'Update organization failed. Please try again or contact your administrator.'
      )
    );
  }
}

export function* updateOrganizationWatcher(): object {
  yield takeLatest(UPDATE_ORGANIZATION, updateOrganization);
}

function* createOrganization(action: CreateOrganizationAction): object {
  try {
    const token = cookie.load('token');
    const url = 'http://localhost:8080/api/v1/organisations';
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    const json = yield axios.post(url, {
      name: action.payload,
    });
    yield put(createOrganizationSuccess(json.data));
  } catch (error) {
    yield put(createOrganizationFailure());
  }
}

export function* createOrganizationWatcher(): object {
  yield takeLatest(CREATE_ORGANIZATION, createOrganization);
}

function* createTemplate(action: CreateTemplateAction): object {
  try {
    const token = cookie.load('token');
    const url = 'http://localhost:8080/api/v1/templates';
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    const json = yield axios.post(url, {
      name: action.payload.name,
      fields: action.payload.fields,
    });
    yield put(createTemplateSuccess(json.data));
  } catch (error) {
    yield put(createTemplateFailure());
  }
}

export function* createTemplateWatcher(): object {
  yield takeLatest(CREATE_TEMPLATE, createTemplate);
}

function* updateTemplate(action: UpdateTemplateAction): object {
  try {
    const token = cookie.load('token');
    const url = 'http://localhost:8080/api/v1/templates';
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    const json = yield axios.post(url, {
      name: action.payload.name,
      fields: action.payload.fields,
    });
    yield put(updateTemplateSuccess(json.data));
  } catch (error) {
    const errorMessage =
      'Update template failed. Please contact the administrator.';
    yield put(updateTemplateFailure(errorMessage));
  }
}

export function* updateTemplateWatcher(): object {
  yield takeLatest(UPDATE_TEMPLATE, updateTemplate);
}

function* deleteTemplate(action: DeleteTemplateAction): object {
  try {
    const token = cookie.load('token');
    const url = 'http://localhost:8080/api/v1/templates';
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    const json = yield axios.delete(url, {
      data: {
        name: action.payload,
      },
    });
    yield put(deleteTemplateSuccess(json.data));
  } catch (error) {
    yield put(
      deleteTemplateFailure(
        'Delete template failed. Please contact the administrator.'
      )
    );
  }
}

export function* deleteTemplateWatcher(): object {
  yield takeLatest(DELETE_TEMPLATE, deleteTemplate);
}
