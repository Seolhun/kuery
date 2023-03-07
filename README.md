![Stage Github workflow](https://github.com/Seolhun/kuery/actions/workflows/stage-build-test.yml/badge.svg)
![Dev Github workflow](https://github.com/Seolhun/kuery/actions/workflows/dev-build-test.yml/badge.svg)

# Kuery

To parse/stringify query string to improve ui/ux

## Requirement

Node > 10.0

## Install

```bash
npm install @seolhun/kuery
```

```ts
import Kuery from '@seolhun/kuery';
```

## Examples

### Parse

```ts
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
```

### Stringify

```ts
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
```
