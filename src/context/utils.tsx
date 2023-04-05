import {
  MachineCategory,
  MachineCategoryAttribute,
  Machine,
  MachineAttribute,
  AtrributeValue,
  AttributeValueOptions,
} from '../types';
import getUniqueId from '../utils/getUniqueId';
import {attributeValueOptions} from '../constants';

export const createMachineCategoryAttributeObj = (
  valueOption: AttributeValueOptions,
): MachineCategoryAttribute => {
  return {
    id: getUniqueId(),
    name: '',
    nameUnique: false,
    lastUniqueName: '',
    valueOption,
  };
};

export const createMachineCategoryObj = (): MachineCategory => {
  const attribute = createMachineCategoryAttributeObj(attributeValueOptions[0]);

  return {
    id: getUniqueId(),
    name: '',
    nameUnique: false,
    lastUniqueName: '',
    titleAttributeId: attribute.id,
    attributes: [attribute],
  };
};

export const getDefaultAttributeValue = (
  valueOption: AttributeValueOptions,
): AtrributeValue => {
  switch (valueOption) {
    case 'text':
      return '';
    case 'number':
      return null;
    case 'checkbox':
      return false;
    case 'date':
      return 0;
    default:
      return '';
  }
};

export const createMachineAttributeObj = (
  parentAttribute: MachineCategoryAttribute,
): MachineAttribute => {
  const {id: categoryAttributeId, name, valueOption} = parentAttribute;

  return {
    id: getUniqueId(),
    categoryAttributeId,
    name,
    value: getDefaultAttributeValue(valueOption),
    valueOption,
  };
};

export const createMachineObj = (
  categoryId: string,
  parentMachineAttributes: MachineCategoryAttribute[],
): Machine => {
  return {
    id: getUniqueId(),
    categoryId,
    attributes: parentMachineAttributes.map(createMachineAttributeObj),
  };
};

export const isNameUnique = (name: string, names: string[]) => {
  let count = 0;
  let i = 0;

  while (i < names.length && count < 2) {
    if (names[i] === name) {
      count++;
    }
    i++;
  }

  return count < 2;
};
