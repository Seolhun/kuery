import { KueryOperatorMap } from '../../Kuery.operators';
import type { SearchFilterFunction } from '../types';

/**
 * Global Sensitive Multiline Search
 * @param query
 * @param target
 */
const searchAsLike: SearchFilterFunction =
  <Item>(query: string) =>
  (itemValue: Item[keyof Item]) => {
    const isIncludedQuery = itemValue.includes(query.toLocaleLowerCase());
    return isIncludedQuery;
  };

const searchAsEquals: SearchFilterFunction = (query: string) => (target: string) => query === target;

export const filterWithOperator = (operator: keyof KueryOperatorMap): SearchFilterFunction => {
  switch (operator) {
    case '$gt': {
      return searchAsEquals;
    }
    case '$gte': {
      return searchAsEquals;
    }
    case '$in': {
      return searchAsEquals;
    }
    case '$lt': {
      return searchAsEquals;
    }
    case '$lte': {
      return searchAsEquals;
    }
    case '$ne': {
      return searchAsEquals;
    }
    case '$nin': {
      return searchAsEquals;
    }
    case '$eq':
    default: {
      return searchAsLike;
    }
  }
};

export default filterWithOperator;
