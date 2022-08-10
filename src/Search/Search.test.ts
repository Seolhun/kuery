import Fx from '@fxts/core';

import type { SearchDimensionalFieldSchema } from './types';
import { groups } from './tests/Search.dummy';
import { searchBy } from './Search';

describe('Search', () => {
  describe('searchBy', () => {
    it('only name(AND) - name에 검색쿼리가 포함된 결과가 나와야 합니다.', () => {
      const query = 'TF';
      const schema: SearchDimensionalFieldSchema = [
        {
          AND: [
            {
              key: 'name',
            },
          ],
        },
      ];
      const result = Fx.pipe(
        query,
        searchBy(groups, schema),
        Fx.map((group) => group.id),
      );
      expect(result).toEqual(['108388', '114471', '122196', '116999', '124831', '92252']);
    });

    it('only name(OR) - name에 검색쿼리가 포함된 결과가 나와야 합니다.', () => {
      const query = 'TF';
      const schema: SearchDimensionalFieldSchema = [
        {
          AND: [
            {
              key: 'name',
            },
          ],
        },
      ];
      const result = Fx.pipe(
        query,
        searchBy(groups, schema),
        Fx.map((group) => group.id),
      );
      expect(result).toEqual(['108388', '114471', '122196', '116999', '124831', '92252']);
    });

    it('name(AND) "and" description(AND) - name과 description에 검색쿼리가 포함된 결과가 나와야 합니다.', () => {
      const query = 'Dynamic';
      const schema: SearchDimensionalFieldSchema = [
        {
          AND: [
            {
              key: 'name',
            },
            {
              key: 'description',
            },
          ],
        },
      ];
      const result = Fx.pipe(
        query,
        searchBy(groups, schema),
        Fx.map((group) => group.id),
      );
      expect(result).toEqual(['114471']);
    });

    it('name(OR) "or" description(OR) - name 또는 description에 검색쿼리가 포함된 결과가 나와야 합니다.', () => {
      const query = 'Dynamic';
      const schema: SearchDimensionalFieldSchema = [
        {
          OR: [
            {
              key: 'name',
            },
            {
              key: 'description',
            },
          ],
        },
      ];
      const result = Fx.pipe(
        query,
        searchBy(groups, schema),
        Fx.map((group) => group.id),
      );
      expect(result).toEqual(['114471', '92252']);
    });

    describe('Mixed upper/lowerCase query', () => {
      it('name(OR) "or" description(OR) - 대소문자 구분 없이 name 또는 description에 검색쿼리가 포함된 결과가 나와야 합니다.', () => {
        const query = 'dYnAmIc';
        const schema: SearchDimensionalFieldSchema = [
          {
            OR: [
              {
                key: 'name',
              },
              {
                key: 'description',
              },
            ],
          },
        ];
        const result = Fx.pipe(
          query,
          searchBy(groups, schema),
          Fx.map((group) => group.id),
        );
        expect(result).toEqual(['114471', '92252']);
      });
    });
  });
});
