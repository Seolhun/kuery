/**
 * 1. KueryOperator
 * 2. KueryValueOperator
 */
export enum KueryOperator {
  OR = '||',
  AND = '&',
}
export enum KueryValueOperator {
  AND = ',',
}

export type ParsedKueryValues = KueryOrValue[];

export type KueryOrValue = KueryAndValue[];

export interface KueryAndValue {
  key: string;
  value: KueryValue[];
}

export type KueryValueType = 'string' | 'number' | 'boolean' | 'date';

export interface KueryValue {
  type: KueryValueType;
  value: any;
}
