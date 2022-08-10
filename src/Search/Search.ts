import Fx from '@fxts/core';

import { searchItemsBySchema } from './searchItemsBySchema';
import type { SearchDimensionalFieldSchema } from './types';

export const searchBy =
  <Item>(items: Item[], searchSchema: SearchDimensionalFieldSchema<Item>) =>
  (query: string) => {
    const results = Fx.pipe(query, searchItemsBySchema<Item>(items, searchSchema));
    return results;
  };

export * from './types';
