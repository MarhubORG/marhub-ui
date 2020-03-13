import {
  EXPORTING_IRAP_DATA,
  EXPORT_IRAP_DATA_FAILURE,
  EXPORT_IRAP_DATA_SUCCESS,
} from '../constants/actionTypes';

export interface ExportingIrapDataAction {
  type: typeof EXPORTING_IRAP_DATA;
}

export function exportingIrapData(): ExportingIrapDataAction {
  return { type: EXPORTING_IRAP_DATA };
}

export interface ExportIrapDataSuccessAction {
  type: typeof EXPORT_IRAP_DATA_SUCCESS;
  payload: object;
}

export function exportingIrapDataSuccess(
  data: object
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

export type ApiActionTypes =
  | ExportingIrapDataAction
  | ExportIrapDataSuccessAction
  | ExportIrapDataFailureAction;
