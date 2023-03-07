/**
 * 1. KueryLogicalSeparator
 * 2. KueryValueOperator
 */
export enum KuerySeparatorEnum {
  OR = '||',
  AND = '&&',
}

export enum KueryValueSeparatorEnum {
  AND = ',',
}

export enum KueryValueOperatorEnum {
  EQUALS = 'EQ',
  NOT_EQUALS = 'NE',
  LESS_THAN = 'LT',
  LESS_THAN_OR_EQUAL = 'LTE',
  GREATER_THAN = 'GT',
  GREATER_THAN_OR_EQUAL = 'GTE',
  IN = 'IN',
  NOT_IN = 'NIN',
  BETWEEN = 'BTW',
}

export type ParsedKueryValues = KueryOrValue[];

export type KueryOrValue = KueryAndValue[];

export interface KueryAndValue {
  key: string;
  value: KueryValue[];

  /**
   * If it is undefined, always return true
   */
  operator?: KueryValueOperatorEnum;
}

export type KueryValueType = 'string' | 'number' | 'boolean' | 'date';

export interface KueryValue {
  type: KueryValueType;
  value: any;
}
