import {attributeValueOptions} from './constants';

export interface MachineCategory {
  id: string;
  name: string;
  nameUnique: boolean;
  lastUniqueName: string;
  titleAttributeId: string;
  attributes: MachineCategoryAttribute[];
  error: string;
}

export type AttributeValueOptions = (typeof attributeValueOptions)[number];

export type AtrributeValue = string | number | boolean | null;

export interface MachineCategoryAttribute {
  id: string;
  name: string;
  nameUnique: boolean;
  lastUniqueName: string;
  valueOption: AttributeValueOptions;
}

export interface MachineAttribute {
  id: string;
  categoryAttributeId: string;
  name: string;
  value: AtrributeValue;
  valueOption: AttributeValueOptions;
}

export interface Machine {
  id: string;
  categoryId: string;
  attributes: MachineAttribute[];
  name: string;
}
