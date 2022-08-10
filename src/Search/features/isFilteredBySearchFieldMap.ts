import Fx from '@fxts/core';

/* Internal dependencies */
import type { SearchDimensionalFieldSchema, SearchField, SearchGroupFieldMap } from '../types';
import { filterWithOperator } from './filterWithOperator';

const filterBySearchField =
  <Item>(query: string, item: Item) =>
  (searchField: SearchField<Item>): boolean => {
    const itemValue = item[searchField.key];
    if (Fx.isNil(itemValue)) {
      return false;
    }
    if (searchField.filter) {
      return searchField.filter(query, itemValue);
    }
    const searchOperator = searchField.operator ?? 'LIKE';
    return filterWithOperator(searchOperator)(query)(itemValue);
  };

const filterBySearchFieldMap =
  <Item>(query: string, item: Item) =>
  (searchFieldMap: Partial<SearchGroupFieldMap>): boolean => {
    let initialMatchResult: boolean;
    const searchFieldMapKeys = Object.keys(searchFieldMap) as (keyof typeof searchFieldMap)[];
    const searchFieldMatchResult: boolean = searchFieldMapKeys.every((condition) => {
      const isNilResult = initialMatchResult == null;
      const searchField = searchFieldMap[condition];
      if (searchField) {
        if (condition === 'AND') {
          const fieldResult = searchField.every(filterBySearchField(query, item));
          initialMatchResult = isNilResult ? fieldResult : initialMatchResult && fieldResult;
        }
        if (condition === 'OR') {
          const fieldResult = searchField.some(filterBySearchField(query, item));
          initialMatchResult = isNilResult ? fieldResult : initialMatchResult || fieldResult;
        }
      }
      return initialMatchResult;
    });
    return searchFieldMatchResult;
  };

/**
 * TODO (@sol): AND, OR에 의존되어있어서 자동화 할 수 있는 로직으로 변경이 필요
 */
export const isFilteredBySearchFieldMap =
  <Item>(query: string, schema: SearchDimensionalFieldSchema) =>
  (item: Item): boolean => {
    const results = Fx.pipe(schema, Fx.every(filterBySearchFieldMap(query, item)));
    return results;
  };

export default isFilteredBySearchFieldMap;
