import {
  EXPORTING_IRAP_DATA,
  EXPORT_IRAP_FAILURE,
  EXPORT_IRAP_SUCCESS,
} from '../constants/actionTypes';

export interface ExportingIrapDataAction {
  type: typeof EXPORTING_IRAP_DATA;
}

export function exportingIrapData(): ExportingIrapDataAction {
  return { type: EXPORTING_IRAP_DATA };
}

export type ApiActionTypes = ExportingIrapDataAction;
