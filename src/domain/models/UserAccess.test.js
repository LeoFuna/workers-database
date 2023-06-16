const UserAccess = require('./UserAccess');

describe('Test User Access class', () => {
  const userAccess = new UserAccess({ name: 'John Doe' });
  it('instance has name', () => {
    expect(Object.keys(userAccess)).toEqual(['name']);
  });
  it('instance has right value', () => {
    expect(Object.values(userAccess)).toEqual(['John Doe']);
  });
});
