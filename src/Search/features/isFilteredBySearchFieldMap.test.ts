import type { SearchDimensionalFieldSchema } from '../types';
import { isFilteredBySearchFieldMap } from './isFilteredBySearchFieldMap';

const COUNT = 31;
const items = Array.from(Array(COUNT)).map((_v, i) => ({
  name: `sol${i}`,
  division: `web${i}`,
  age: i,
}));

describe('isFilteredBySearchFieldMap', () => {
  describe('1개의 Field에', () => {
    describe('1개의 조건이', () => {
      describe('AND만 존재하고', () => {
        it('EQUALS인 경우', () => {
          const query = 'sol3';
          const searchSchema: SearchDimensionalFieldSchema = [
            {
              AND: [
                {
                  operator: 'EQUALS',
                  key: 'name',
                },
              ],
            },
          ];
          const results = items.filter(isFilteredBySearchFieldMap(query, searchSchema));
          expect(results).toStrictEqual([
            {
              name: 'sol3',
              division: 'web3',
              age: 3,
            },
          ]);
        });

        it('LIKE인 경우', () => {
          const query = 'sol3';
          const searchSchema: SearchDimensionalFieldSchema = [
            {
              AND: [
                {
                  operator: 'LIKE',
                  key: 'name',
                },
              ],
            },
          ];
          const results = items.filter(isFilteredBySearchFieldMap(query, searchSchema));
          expect(results).toStrictEqual([
            {
              name: 'sol3',
              division: 'web3',
              age: 3,
            },
            {
              name: 'sol30',
              division: 'web30',
              age: 30,
            },
          ]);
        });
      });
      describe('OR만 존재하고', () => {
        it('EQUALS인 경우', () => {
          const query = 'sol3';
          const searchSchema: SearchDimensionalFieldSchema = [
            {
              OR: [
                {
                  operator: 'EQUALS',
                  key: 'name',
                },
              ],
            },
          ];
          const results = items.filter(isFilteredBySearchFieldMap(query, searchSchema));
          expect(results).toStrictEqual([
            {
              name: 'sol3',
              division: 'web3',
              age: 3,
            },
          ]);
        });

        it('LIKE인 경우', () => {
          const query = 'sol3';
          const searchSchema: SearchDimensionalFieldSchema = [
            {
              OR: [
                {
                  operator: 'LIKE',
                  key: 'name',
                },
              ],
            },
          ];
          const results = items.filter(isFilteredBySearchFieldMap(query, searchSchema));
          expect(results).toStrictEqual([
            {
              name: 'sol3',
              division: 'web3',
              age: 3,
            },
            {
              name: 'sol30',
              division: 'web30',
              age: 30,
            },
          ]);
        });
      });

      describe('2개 이상의 조건이', () => {
        describe('AND만 존재하고', () => {
          it('EQUALS인 경우', () => {
            const query = '3';
            const searchSchema: SearchDimensionalFieldSchema = [
              {
                AND: [
                  {
                    operator: 'EQUALS',
                    key: 'name',
                  },
                  {
                    operator: 'EQUALS',
                    key: 'age',
                  },
                ],
              },
            ];
            const results = items.filter(isFilteredBySearchFieldMap(query, searchSchema));
            expect(results).toStrictEqual([]);
          });

          it('LIKE인 경우', () => {
            const query = '3';
            const searchSchema: SearchDimensionalFieldSchema = [
              {
                AND: [
                  {
                    operator: 'LIKE',
                    key: 'name',
                  },
                  {
                    operator: 'LIKE',
                    key: 'age',
                  },
                ],
              },
            ];
            const results = items.filter(isFilteredBySearchFieldMap(query, searchSchema));
            expect(results).toStrictEqual([
              {
                name: 'sol3',
                division: 'web3',
                age: 3,
              },
              {
                name: 'sol13',
                division: 'web13',
                age: 13,
              },
              {
                name: 'sol23',
                division: 'web23',
                age: 23,
              },
              {
                name: 'sol30',
                division: 'web30',
                age: 30,
              },
            ]);
          });
        });

        describe('OR만 존재하고', () => {
          it('EQUALS인 경우', () => {
            const query = '3';
            const searchSchema: SearchDimensionalFieldSchema = [
              {
                OR: [
                  {
                    operator: 'EQUALS',
                    key: 'name',
                  },
                  {
                    operator: 'EQUALS',
                    key: 'age',
                  },
                ],
              },
            ];
            const results = items.filter(isFilteredBySearchFieldMap(query, searchSchema));
            expect(results).toStrictEqual([
              {
                name: 'sol3',
                division: 'web3',
                age: 3,
              },
            ]);
          });

          it('LIKE인 경우', () => {
            const query = '3';
            const searchSchema: SearchDimensionalFieldSchema = [
              {
                OR: [
                  {
                    operator: 'LIKE',
                    key: 'name',
                  },
                  {
                    operator: 'LIKE',
                    key: 'age',
                  },
                ],
              },
            ];
            const results = items.filter(isFilteredBySearchFieldMap(query, searchSchema));
            expect(results).toStrictEqual([
              {
                name: 'sol3',
                division: 'web3',
                age: 3,
              },
              {
                name: 'sol13',
                division: 'web13',
                age: 13,
              },
              {
                name: 'sol23',
                division: 'web23',
                age: 23,
              },
              {
                name: 'sol30',
                division: 'web30',
                age: 30,
              },
            ]);
          });
        });

        describe('AND와 OR 모두 존재하고', () => {
          it('EQUALS인 경우', () => {
            const query = '3';
            const searchSchema: SearchDimensionalFieldSchema = [
              {
                AND: [
                  {
                    operator: 'EQUALS',
                    key: 'name',
                  },
                ],
                OR: [
                  {
                    operator: 'EQUALS',
                    key: 'age',
                  },
                ],
              },
            ];
            const results = items.filter(isFilteredBySearchFieldMap(query, searchSchema));
            expect(results).toStrictEqual([]);
          });

          it('LIKE인 경우', () => {
            const query = '3';
            const searchSchema: SearchDimensionalFieldSchema = [
              {
                AND: [
                  {
                    operator: 'LIKE',
                    key: 'name',
                  },
                ],
                OR: [
                  {
                    operator: 'LIKE',
                    key: 'age',
                  },
                ],
              },
            ];
            const results = items.filter(isFilteredBySearchFieldMap(query, searchSchema));
            expect(results).toStrictEqual([
              {
                name: 'sol3',
                division: 'web3',
                age: 3,
              },
              {
                name: 'sol13',
                division: 'web13',
                age: 13,
              },
              {
                name: 'sol23',
                division: 'web23',
                age: 23,
              },
              {
                name: 'sol30',
                division: 'web30',
                age: 30,
              },
            ]);
          });

          it('EQUALS | LIKE가 섞여있는 경우', () => {
            const query = '3';
            const searchSchema: SearchDimensionalFieldSchema = [
              {
                AND: [
                  {
                    operator: 'LIKE',
                    key: 'name',
                  },
                ],
                OR: [
                  {
                    operator: 'EQUALS',
                    key: 'age',
                  },
                ],
              },
            ];
            const results = items.filter(isFilteredBySearchFieldMap(query, searchSchema));
            expect(results).toStrictEqual([
              {
                name: 'sol3',
                division: 'web3',
                age: 3,
              },
              {
                name: 'sol13',
                division: 'web13',
                age: 13,
              },
              {
                name: 'sol23',
                division: 'web23',
                age: 23,
              },
              {
                name: 'sol30',
                division: 'web30',
                age: 30,
              },
            ]);
          });
        });
      });
    });
  });
  describe('2개의 Field에', () => {
    it('EQUALS | LIKE가 섞여있는 경우', () => {
      const query = '3';
      const searchSchema: SearchDimensionalFieldSchema = [
        {
          AND: [
            {
              operator: 'LIKE',
              key: 'division',
            },
          ],
        },
        {
          OR: [
            {
              operator: 'EQUALS',
              key: 'age',
            },
          ],
        },
      ];
      const results = items.filter(isFilteredBySearchFieldMap(query, searchSchema));
      expect(results).toStrictEqual([
        {
          name: 'sol3',
          division: 'web3',
          age: 3,
        },
      ]);
    });
  });

  describe('2개의 Field에', () => {
    it('Schema에 custom filter를 넣는 경우', () => {
      const query = '3';
      const searchSchema: SearchDimensionalFieldSchema = [
        {
          AND: [
            {
              key: 'division',
              filter: (_query: string, itemValue: string) => itemValue.includes('web1'),
            },
          ],
        },
        {
          AND: [
            {
              key: 'age',
              filter: (_query: string, itemValue: number) => itemValue > 10,
            },
          ],
        },
      ];
      const results = items.filter(isFilteredBySearchFieldMap(query, searchSchema));
      expect(results).toStrictEqual([
        {
          age: 11,
          division: 'web11',
          name: 'sol11',
        },
        {
          age: 12,
          division: 'web12',
          name: 'sol12',
        },
        {
          age: 13,
          division: 'web13',
          name: 'sol13',
        },
        {
          age: 14,
          division: 'web14',
          name: 'sol14',
        },
        {
          age: 15,
          division: 'web15',
          name: 'sol15',
        },
        {
          age: 16,
          division: 'web16',
          name: 'sol16',
        },
        {
          age: 17,
          division: 'web17',
          name: 'sol17',
        },
        {
          age: 18,
          division: 'web18',
          name: 'sol18',
        },
        {
          age: 19,
          division: 'web19',
          name: 'sol19',
        },
      ]);
    });
  });
});
