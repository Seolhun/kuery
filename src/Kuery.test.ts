import Kuery from './Kuery';

type KueryValueType = any;

describe('Kuery Test', () => {
  it('comparator', () => {
    const comparator = (key, prevValue, nextValue) => {
      if (key === 'foo') {
        const hit = prevValue !== 4 && prevValue !== nextValue;
        return hit;
      }
      return true;
    };
    const initialData = { foo: 3 };
    const kuery = new Kuery<KueryValueType>({ initialData, comparator });
    kuery.set('user', { id: 1, name: 'seolhun' });
    kuery.set('foo', 4);
    expect(kuery.get('user')).toEqual({ id: 1, name: 'seolhun' });
    expect(kuery.get('foo')).toEqual(4);
    kuery.set('user', { id: 1, name: 'seolhun' });
    kuery.set('foo', 5);
    expect(kuery.get('user')).toEqual({ id: 1, name: 'seolhun' });
    expect(kuery.get('foo')).toEqual(4);
  });

  it('clear()', () => {
    const kuery = new Kuery<KueryValueType>();
    kuery.set('user', {
      id: 1,
      name: 'hun',
    });
    expect(kuery.clear().keys()).toEqual([]);
  });

  it('delete', () => {
    const kuery = new Kuery<KueryValueType>();
    kuery.set('user', {
      id: 1,
      name: 'hun',
    });
    kuery.set('users', []);
    expect(kuery.delete('user').keys()).toEqual(['users']);
  });

  it('set() - get()', () => {
    const kuery = new Kuery<KueryValueType>();
    kuery.set('user', {
      id: 1,
      name: 'hun',
    });
    expect(kuery.get('user')).toEqual({ id: 1, name: 'hun' });
  });

  it('get(): No kuery key', () => {
    const kuery = new Kuery<KueryValueType>();
    expect(kuery.get('foo')).toEqual(null);
  });

  it('keys()', () => {
    const kuery = new Kuery<KueryValueType>();
    expect(kuery.keys()).toEqual([]);
    kuery.set('user', {
      id: 1,
      name: 'hun',
    });
    expect(kuery.keys()).toEqual(['user']);
  });

  it('has()', () => {
    const kuery = new Kuery<KueryValueType>();
    kuery.set('user', {
      id: 1,
      name: 'hun',
    });
    expect(kuery.has('user')).toEqual(true);
    expect(kuery.has('users')).toEqual(false);
    expect(kuery.has('fdsa')).toEqual(false);
  });

  it('serializeKey()', () => {
    const kuery = new Kuery<KueryValueType>();
    expect(kuery.serializeKey('user')).toEqual(['user', 'error@user']);
    expect(kuery.serializeKey('foo')).toEqual(['foo', 'error@foo']);
  });
});
