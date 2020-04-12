import { getHeaders, formatDate } from './excel';

describe('getHeaders', () => {
  it('should return a unique list of formatted object headers', () => {
    const headers = [
      { a: 1, b: 1, c: 1 },
      { a: 1, b: 1, c: 1 },
      { a: 1, b: 1, c: 1 },
    ];
    const expected = [
      { header: 'a', key: 'a' },
      { header: 'b', key: 'b' },
      { header: 'c', key: 'c' },
    ];
    expect(getHeaders(headers)).toEqual(expected);
  });

  it('should sort the returned list', () => {
    const headers = [
      { c: 1, b: 1, a: 1 },
      { c: 1, b: 1, a: 1 },
      { c: 1, b: 1, a: 1 },
    ];
    const expected = [
      { header: 'a', key: 'a' },
      { header: 'b', key: 'b' },
      { header: 'c', key: 'c' },
    ];
    expect(getHeaders(headers)).toEqual(expected);
  });
});

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
