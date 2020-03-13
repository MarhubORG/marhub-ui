import { EXPORTING_IRAP_DATA } from '../constants/actionTypes';
import { exportingIrapData } from './api';

describe('exportingIrapData', () => {
  it('should return a properly formatted action', () => {
    const expected = {
      type: EXPORTING_IRAP_DATA,
    };
    expect(exportingIrapData()).toEqual(expected);
  });
});
