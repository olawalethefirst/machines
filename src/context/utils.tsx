import {
  MachineCategory,
  MachineCategoryAttribute,
  Machine,
  MachineAttribute,
  AtrributeValue,
  AttributeValueOptions,
} from '../types';
import getUniqueId from '../utils/getUniqueId';
import {attributeValueOptions, minAttributesCount} from '../constants';
import sanitizeString from '../utils/sanitizeString';

export const createMachineCategoryAttributeObj = (
  valueOption: AttributeValueOptions,
): MachineCategoryAttribute => {
  return {
    id: getUniqueId(),
    name: '',
    nameUnique: true,
    lastUniqueName: '',
    valueOption,
  };
};

export const createMachineCategoryObj = (): MachineCategory => {
  const attribute = createMachineCategoryAttributeObj(attributeValueOptions[0]);

  return {
    id: getUniqueId(),
    name: '',
    nameUnique: true,
    lastUniqueName: '',
    titleAttributeId: attribute.id,
    attributes: [attribute],
    error: '',
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
  name: string,
  categoryId: string,
  parentMachineAttributes: MachineCategoryAttribute[],
): Machine => {
  return {
    id: getUniqueId(),
    categoryId,
    name,
    attributes: parentMachineAttributes.map(createMachineAttributeObj),
  };
};

export const isNameUnique = (name: string, names: string[]) => {
  let count = 0;
  let i = 0;

  const sanitizedName = sanitizeString(name);

  if (sanitizedName.length === 0) {
    return false;
  }

  const sanitizedNames = names.map(_name => sanitizeString(_name));

  while (i < sanitizedNames.length && count < 2) {
    if (sanitizedNames[i] === sanitizedName) {
      count++;
    }
    i++;
  }

  return count < 2;
};

export const shouldDeleteCategoryAttribute = (
  categoryAttributes: MachineCategoryAttribute[],
  attributeId: string,
) => {
  if (categoryAttributes.length <= minAttributesCount) {
    return false;
  }

  const remainingTextAttributes = categoryAttributes.filter(
    attribute =>
      attribute.valueOption === 'text' && attribute.id !== attributeId,
  );

  return remainingTextAttributes.length > 0;
};

export const shouldChangeAttributeOption = (
  categoryAttributes: MachineCategoryAttribute[],
  attributeId: string,
  attributeOption: AttributeValueOptions,
) => {
  if (attributeOption === 'text') {
    return true;
  }

  const remainingTextAttributes = categoryAttributes.filter(
    attribute =>
      attribute.valueOption === 'text' && attribute.id !== attributeId,
  );

  return remainingTextAttributes.length > 0;
};
