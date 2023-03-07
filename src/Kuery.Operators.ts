import { KueryValueOperatorEnum } from './Kuery.types';

export const compareValues =
  (operator: KueryValueOperatorEnum) =>
  <Value>(a: Value, b: Value) => {
    switch (operator) {
      case KueryValueOperatorEnum.EQUALS: {
        return a === b;
      }
      case KueryValueOperatorEnum.NOT_EQUALS: {
        return a !== b;
      }
      case KueryValueOperatorEnum.LESS_THAN: {
        return a < b;
      }
      case KueryValueOperatorEnum.LESS_THAN_OR_EQUAL: {
        return a <= b;
      }
      case KueryValueOperatorEnum.GREATER_THAN: {
        return a > b;
      }
      case KueryValueOperatorEnum.GREATER_THAN_OR_EQUAL: {
        return a >= b;
      }
      case KueryValueOperatorEnum.IN: {
        if (Array.isArray(b)) {
          return b.includes(a);
        } else {
          return false;
        }
      }
      case KueryValueOperatorEnum.NOT_IN: {
        if (Array.isArray(b)) {
          return !b.includes(a);
        } else {
          return true;
        }
      }
      case KueryValueOperatorEnum.BETWEEN: {
        if (Array.isArray(b) && b.length === 2) {
          return a >= b[0] && a <= b[1];
        } else {
          throw new Error('Invalid value for BETWEEN operator');
        }
      }
      default: {
        return true;
      }
    }
  };
