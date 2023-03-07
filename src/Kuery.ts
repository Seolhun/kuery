import {
  KueryValue,
  KueryAndValue,
  KueryOrValue,
  ParsedKueryValues,
  KuerySeparatorEnum,
  KueryValueSeparatorEnum,
} from './Kuery.types';

export class Kuery {
  static parse(input: string): ParsedKueryValues {
    const orConditions = input.split(KuerySeparatorEnum.OR);
    const parsedOrConditions: KueryOrValue[] = orConditions.map((orCondition) => {
      const andConditions = orCondition.split(KuerySeparatorEnum.AND);
      const parsedAndConditions: KueryAndValue[] = andConditions.map((andCondition) => {
        const [key, valueString] = andCondition.split('=');
        const value = valueString.split(KueryValueSeparatorEnum.AND);
        const parsedValue: KueryValue[] = value.map((v) => {
          if (/^\d{8}$/.test(v)) {
            const year = parseInt(v.substring(0, 4));
            const month = parseInt(v.substring(4, 6));
            const day = parseInt(v.substring(6, 8));
            return { type: 'date', value: new Date(year, month - 1, day) };
          } else if (/^-?\d+$/.test(v)) {
            return {
              type: 'number',
              value: parseInt(v),
            };
          } else if (/^(true|false)$/.test(v)) {
            return {
              type: 'boolean',
              value: v === 'true',
            };
          } else {
            return {
              type: 'string',
              value: decodeURIComponent(v),
            };
          }
        });
        return {
          key,
          value: parsedValue,
        };
      });
      return parsedAndConditions;
    });
    return parsedOrConditions;
  }

  static stringify(orValues: ParsedKueryValues): string {
    const orConditions = orValues.map((orValue) => {
      // Will be added operator support in the future
      const andConditions = orValue.map(({ key, value }) => {
        return `${key}=${value.map((v) => encodeURIComponent(v.value)).join(KueryValueSeparatorEnum.AND)}`;
      });
      return andConditions.join(KuerySeparatorEnum.AND);
    });
    return orConditions.join(KuerySeparatorEnum.OR);
  }
}
