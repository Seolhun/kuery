import { KueryInterface, KueryConstructorInterface, comparator } from './Kuery.types';

class Kuery<Item> implements KueryInterface<Item> {
  private _kuery: Map<keyof Item, Item>;
  private _comparator: comparator;

  constructor({ comparator }: KueryConstructorInterface<Item>) {
    this._kuery = new Map<keyof Item, Item>();
    this._comparator = comparator ? comparator : () => true;
  }

  clear() {
    this._kuery.clear();
    return this;
  }
}

export { Kuery };
export default Kuery;
