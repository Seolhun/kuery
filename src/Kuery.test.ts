import { describe, it, expect } from 'vitest'

import { ParsedKueryValues } from './Kuery.types';
import { Kuery } from './Kuery';


describe('Kuery', () => {
  describe('parse()', () => {
    it('should correctly parse a simple Kuery string', () => {
      const input = 'name=seolhun||age=25';
      const expectedOutput = [
        [
          {
            key: 'name',
            value: [{ type: 'string', value: 'seolhun' }],
          },
        ],
        [
          {
            key: 'age',
            value: [{ type: 'number', value: 25 }],
          },
        ],
      ];

      const parsed = Kuery.parse(input);
      expect(parsed).toEqual(expectedOutput);
    });

    it('should correctly parse a Kuery string with multiple And for a key', () => {
      const input = 'name=seolhun&&age=25||age=25';
      const expectedOutput = [
        [
          {
            key: 'name',
            value: [
              {
                type: 'string',
                value: 'seolhun',
              },
            ],
          },
          {
            key: 'age',
            value: [
              {
                type: 'number',
                value: 25,
              },
            ],
          },
        ],
        [
          {
            key: 'age',
            value: [{ type: 'number', value: 25 }],
          },
        ],
      ];

      const parsed = Kuery.parse(input);
      expect(parsed).toEqual(expectedOutput);
    });

    it('should correctly parse a Kuery string with multiple And values for a key', () => {
      const input = 'name=seol,hun||age=25';
      const expectedOutput = [
        [
          {
            key: 'name',
            value: [
              { type: 'string', value: 'seol' },
              { type: 'string', value: 'hun' },
            ],
          },
        ],
        [
          {
            key: 'age',
            value: [{ type: 'number', value: 25 }],
          },
        ],
      ];

      const parsed = Kuery.parse(input);
      expect(parsed).toEqual(expectedOutput);
    });

    it('should correctly parse a Kuery string with multiple values for a key', () => {
      const input = 'name=john.doe||name=jane.doe';
      const expectedOutput: ParsedKueryValues = [
        [
          {
            key: 'name',
            value: [
              {
                type: 'string',
                value: 'john.doe',
              },
            ],
          },
        ],
        [
          {
            key: 'name',
            value: [
              {
                type: 'string',
                value: 'jane.doe',
              },
            ],
          },
        ],
      ];

      const parsed = Kuery.parse(input);
      expect(parsed).toEqual(expectedOutput);
    });

    it('should correctly parse a Kuery string with different value types', () => {
      const input = 'name=john.doe||age=25||isMarried=true||dob=19801020';
      const expectedOutput = [
        [
          {
            key: 'name',
            value: [{ type: 'string', value: 'john.doe' }],
          },
        ],
        [
          {
            key: 'age',
            value: [{ type: 'number', value: 25 }],
          },
        ],
        [
          {
            key: 'isMarried',
            value: [{ type: 'boolean', value: true }],
          },
        ],
        [
          {
            key: 'dob',
            value: [{ type: 'date', value: new Date(1980, 9, 20) }],
          },
        ],
      ];

      const parsed = Kuery.parse(input);
      expect(parsed).toEqual(expectedOutput);
    });

    it('should correctly parse a Kuery string with URL-encoded values', () => {
      const input = 'name=John%20Doe||company=Acme%20Inc.';
      const expectedOutput = [
        [
          {
            key: 'name',
            value: [{ type: 'string', value: 'John Doe' }],
          },
        ],
        [
          {
            key: 'company',
            value: [{ type: 'string', value: 'Acme Inc.' }],
          },
        ],
      ];

      const parsed = Kuery.parse(input);
      expect(parsed).toEqual(expectedOutput);
    });
  });

  describe('stringify', () => {
    it('should convert ParsedKueryValues to a string', () => {
      const kuery: ParsedKueryValues = [
        [
          {
            key: 'name',
            value: [{ type: 'string', value: 'SeolHun' }],
          },
          {
            key: 'age',
            value: [{ type: 'number', value: 30 }],
          },
        ],
        [
          {
            key: 'isStudent',
            value: [{ type: 'boolean', value: true }],
          },
        ],
      ];
      const expected = 'name=SeolHun&&age=30||isStudent=true';
      const result = Kuery.stringify(kuery);
      expect(result).toEqual(expected);
    });
  });
});
