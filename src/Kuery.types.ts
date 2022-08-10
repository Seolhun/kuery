export type serializeKey = string;
export type serializeKeys = [serializeKey, string];

export type comparator = (key: string, prevValue?: any, nextValue?: any) => boolean;

export interface KueryInterface {
  clear: () => void;
  delete: (key: string) => void;
  set: (key: string, value: any) => this;
  get: (key: string) => any | null;
  keys: () => string[];
  has: (key: string) => boolean;
  serializeKey: (key: string) => serializeKeys;
}

export interface KueryConstructorInterface<T> {
  initialData?: T;
  comparator?: comparator;
}
