import { KueryOperatorMap } from '../Kuery.operators';

export type SearchDimensionalFieldSchema<Item> = Partial<SearchGroupFieldMap<Item>>[];
export interface SearchField<Item> {
  key: keyof Item;
  /**
   * @default $eq
   */
  operator?: keyof KueryOperatorMap;
  /**
   * To
   */
  filter?: (query: string, itemValue: Item[keyof Item]) => boolean;
}

export type SearchGroupFieldMap<Item> = Record<SearchConditionType, SearchField<Item>[]>;
export type SearchConditionType = 'AND' | 'OR';
export type SearchFilterFunction = <Item>(value: string) => (target: Item[keyof Item]) => boolean;
export type SearchBySchemaFunction<Item> = (items: Item[], searchSchema: SearchDimensionalFieldSchema<Item>) => SearchByQueryFunction<Item>;
export type SearchByQueryFunction<Item> = (query: string) => Item[];
