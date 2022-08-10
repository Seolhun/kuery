import {
  KueryInterface,
  KueryConstructorInterface,
  serializeKeys,
  comparator,
} from './Kuery.types';

class Kuery<T> implements KueryInterface {
  private _kuery: Map<string, any>;
  private _comparator: comparator;

  constructor(props: KueryConstructorInterface<T> = {}) {
    this._kuery = new Map(Object.entries<T>(props.initialData || {}));
    this._comparator = props.comparator ? props.comparator : () => true;
  }

  serializeKey(key: string): serializeKeys {
    const serializedKey = key;
    const errorKey = serializedKey ? 'error@' + serializedKey : '';
    return [serializedKey, errorKey];
  }

  clear() {
    this._kuery.clear();
    return this;
  }

  delete(key: string) {
    const [serializedKey] = this.serializeKey(key);
    this._kuery.delete(serializedKey);
    return this;
  }

  set(key: string, value: any): this {
    const [serializedKey] = this.serializeKey(key);
    const prevValue = this._kuery.get(serializedKey);
    const nextValue = value;
    if (this._comparator(key, prevValue, nextValue)) {
      this._kuery.set(serializedKey, value);
    }
    return this;
  }

  get(key: string) {
    const [serializedKey] = this.serializeKey(key);
    const hitData = this._kuery.get(serializedKey);
    if (!hitData) {
      return null;
    }
    return hitData;
  }

  keys() {
    return Array.from(this._kuery.keys());
  }

  has(key: string) {
    const [serializedKey] = this.serializeKey(key);
    return this._kuery.has(serializedKey);
  }
}

export { Kuery };
export default Kuery;
