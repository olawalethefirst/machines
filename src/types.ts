import {attributeValueOptions} from './constants';

export interface MachineCategory {
  id: string;
  name: string;
  nameUnique: boolean;
  titleAttributeId: string;
  attributes: MachineCategoryAttribute[];
  error: string;
}

export type AttributeValueOptions = (typeof attributeValueOptions)[number];

export type AttributeValue = string | number | boolean;

export interface MachineCategoryAttribute {
  id: string;
  name: string;
  nameUnique: boolean;
  valueOption: AttributeValueOptions;
}

interface MachineAttributeBase {
  id: string;
  categoryAttributeId: string;
}
export interface TextAttribute {
  value: string;
  valueOption: (typeof attributeValueOptions)[0];
}
export interface NumberAttribute {
  value: string;
  valueOption: (typeof attributeValueOptions)[1];
}
export interface CheckboxAttribute {
  value: boolean;
  valueOption: (typeof attributeValueOptions)[2];
}
export interface DateAttribute {
  value: number;
  valueOption: (typeof attributeValueOptions)[3];
}

export type MachineAttribute = MachineAttributeBase &
  (TextAttribute | NumberAttribute | CheckboxAttribute | DateAttribute);

export interface Machine {
  id: string;
  categoryId: string;
  attributes: MachineAttribute[];
}
