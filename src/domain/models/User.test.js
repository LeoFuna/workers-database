const User = require('./User');

describe('Test User class', () => {
  const user = new User({ id: '1', name: 'John Doe', job: 'fakeJob' });
  it('instance has id, name and job', () => {
    expect(Object.keys(user)).toEqual(['id', 'name', 'job']);
  });
  it('instance has right values', () => {
    expect(Object.values(user)).toEqual(['1', 'John Doe', 'fakeJob']);
  });
});
