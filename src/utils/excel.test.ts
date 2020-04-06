import { getHeaders } from './excel';

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
