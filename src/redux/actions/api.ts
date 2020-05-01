import {
  EXPORTING_IRAP_DATA,
  EXPORT_IRAP_DATA_FAILURE,
  EXPORT_IRAP_DATA_SUCCESS,
  LOGOUT,
} from '../constants/actionTypes';

export interface ExportingIrapDataPayload {
  startDate: string;
  endDate: string;
  selectedTemplate: string;
  emailText: string;
  irapUuidSearchText: string;
}
export interface ExportingIrapDataAction {
  type: typeof EXPORTING_IRAP_DATA;
  payload: ExportingIrapDataPayload;
}

export function exportingIrapData(
  data: ExportingIrapDataPayload
): ExportingIrapDataAction {
  return { type: EXPORTING_IRAP_DATA, payload: data };
}

export interface ExportIrapDataSuccessAction {
  type: typeof EXPORT_IRAP_DATA_SUCCESS;
  payload: object[];
}

export function exportingIrapDataSuccess(
  data: object[]
): ExportIrapDataSuccessAction {
  return {
    type: EXPORT_IRAP_DATA_SUCCESS,
    payload: data,
  };
}

export interface ExportIrapDataFailureAction {
  type: typeof EXPORT_IRAP_DATA_FAILURE;
  payload: string;
}

export function exportingIrapDataFailure(
  message: string
): ExportIrapDataFailureAction {
  return {
    type: EXPORT_IRAP_DATA_FAILURE,
    payload: message,
  };
}

export interface LogoutAction {
  type: typeof LOGOUT;
}

export function logout(): LogoutAction {
  return { type: LOGOUT };
}

export type ApiActionTypes =
  | ExportingIrapDataAction
  | ExportIrapDataSuccessAction
  | ExportIrapDataFailureAction
  | LogoutAction;
