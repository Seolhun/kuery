import {
  KueryValue,
  KueryAndValue,
  KueryOrValue,
  ParsedKueryValues,
  KueryOperator,
  KueryValueOperator,
} from './Kuery.types';

export class Kuery {
  static parse(input: string): ParsedKueryValues {
    const orConditions = input.split(KueryOperator.OR);
    const parsedOrConditions: KueryOrValue[] = orConditions.map((orCondition) => {
      const andConditions = orCondition.split(KueryOperator.AND);
      const parsedAndConditions: KueryAndValue[] = andConditions.map((andCondition) => {
        const [key, valueString] = andCondition.split('=');
        const value = valueString.split(KueryValueOperator.AND);
        const parsedValue: KueryValue[] = value.map((v) => {
          if (/^\d{8}$/.test(v)) {
            const year = parseInt(v.substring(0, 4));
            const month = parseInt(v.substring(4, 6));
            const day = parseInt(v.substring(6, 8));
            return { type: 'date', value: new Date(year, month - 1, day) };
          } else if (/^-?\d+$/.test(v)) {
            return { type: 'number', value: parseInt(v) };
          } else if (/^(true|false)$/.test(v)) {
            return { type: 'boolean', value: v === 'true' };
          } else {
            return { type: 'string', value: decodeURIComponent(v) };
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

  static stringify(kuery: ParsedKueryValues): string {
    const orConditions = kuery.map((andConditions) =>
      andConditions
        .map(({ key, value }) => `${key}=${value.map((v) => encodeURIComponent(v.value)).join('.')}`)
        .join(','),
    );
    return orConditions.join(KueryOperator.OR);
  }
}
