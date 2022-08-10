export type comparator = <Item>(key: keyof Item, prevValue?: Item[keyof Item], nextValue?: Item[keyof Item]) => boolean;

export interface KueryInterface<Item> {
  clear: () => void;
}

export interface KueryConstructorInterface<Item> {
  comparator?: comparator;
}
