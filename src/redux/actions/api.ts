import {
  EXPORTING_IRAP_DATA,
  EXPORT_IRAP_DATA_FAILURE,
  EXPORT_IRAP_DATA_SUCCESS,
  EXPORTING_BOTPRESS_DATA,
  EXPORT_BOTPRESS_DATA_FAILURE,
  EXPORT_BOTPRESS_DATA_SUCCESS,
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

export interface ExportingBotpressDataPayload {
  startDate: string;
  endDate: string;
  selectedTemplate: string;
  emailText: string;
  irapUuidSearchText: string;
}

export interface ExportingBotpressDataAction {
  type: typeof EXPORTING_BOTPRESS_DATA;
  payload: ExportingBotpressDataPayload;
}

export function exportingBotpressData(
  data: ExportingBotpressDataPayload
): ExportingBotpressDataAction {
  return { type: EXPORTING_BOTPRESS_DATA, payload: data };
}

export interface ExportBotpressDataSuccessAction {
  type: typeof EXPORT_BOTPRESS_DATA_SUCCESS;
  payload: object[];
}

export function exportingBotpressDataSuccess(
  data: object[]
): ExportBotpressDataSuccessAction {
  return {
    type: EXPORT_BOTPRESS_DATA_SUCCESS,
    payload: data,
  };
}

export interface ExportBotpressDataFailureAction {
  type: typeof EXPORT_BOTPRESS_DATA_FAILURE;
  payload: string;
}

export function exportingBotpressDataFailure(
  message: string
): ExportBotpressDataFailureAction {
  return {
    type: EXPORT_BOTPRESS_DATA_FAILURE,
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
  | ExportingBotpressDataAction
  | ExportBotpressDataSuccessAction
  | ExportBotpressDataFailureAction
  | LogoutAction;
