export interface DTOSystemParameter {
  id: number;
  type: ValueType;
  code: string;
  name: string;
  value: string;
  hide: boolean;
}

export enum ValueType {
  STRING,
  NUMERIC,
  BOOLEAN,
  JSON,
  PROPERTY,
  PRICE
}
