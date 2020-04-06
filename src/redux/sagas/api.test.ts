import { formatDate } from './api';

describe('formatDate', () => {
  it('should return a properly formatted date string when all values are above 10', () => {
    const date = new Date('10/10/2020').toDateString();
    const expected = '10/10/2020';
    expect(formatDate(date)).toEqual(expected);
  });
  it('should return a properly formatted date string when all values are above 10 except month', () => {
    const date = new Date('4/10/2020').toDateString();
    const expected = '04/10/2020';
    expect(formatDate(date)).toEqual(expected);
  });
  it('should return a properly formatted date string when all values are above 10 except day', () => {
    const date = new Date('10/1/2020').toDateString();
    const expected = '10/01/2020';
    expect(formatDate(date)).toEqual(expected);
  });
});
