import Fx from '@fxts/core';

import { isFilteredBySearchFieldMap } from './features';
import type { SearchDimensionalFieldSchema } from './types';

/**
 * @param {string} query
 * @returns {any[]}
 * 1. query로 ItemList에 질의할 수 있어야 합니다.
 * 2. itemList에 목표가 되는 property를 array로 받을 수 있어야 합니다.
 */
export const searchItemsBySchema =
  <Item>(items: Item[], schema: SearchDimensionalFieldSchema<Item>) =>
  (query: string) => {
    const results = Fx.pipe(items, Fx.filter(isFilteredBySearchFieldMap(query, schema)));
    return results;
  };
