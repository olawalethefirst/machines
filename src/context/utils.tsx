import {
  MachineCategory,
  MachineCategoryAttribute,
  Machine,
  MachineAttribute,
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
    valueOption,
  };
};

export const createMachineCategoryObj = (): [MachineCategory, string] => {
  const attribute = createMachineCategoryAttributeObj(attributeValueOptions[0]);
  const id = getUniqueId();
  return [
    {
      id,
      name: '',
      nameUnique: true,
      titleAttributeId: attribute.id,
      attributes: [attribute],
      error: '',
    },
    id,
  ];
};

export const getDefaultAttributeValue = <T,>(
  valueOption: T,
): T extends 'number'
  ? string
  : T extends 'checkbox'
  ? boolean
  : T extends 'date'
  ? number
  : string => {
  switch (valueOption) {
    case 'text':
      return '' as any;
    case 'number':
      return '' as any;
    case 'checkbox':
      return false as any;
    case 'date':
      return 0 as any;
    default:
      return '' as any;
  }
};

const getAttrValueWithOption = (valueOption: AttributeValueOptions) => {
  switch (valueOption) {
    case 'date':
      return {valueOption, value: getDefaultAttributeValue(valueOption)};
    case 'number':
      return {valueOption, value: getDefaultAttributeValue(valueOption)};
    case 'checkbox':
      return {valueOption, value: getDefaultAttributeValue(valueOption)};
    default:
      return {valueOption, value: getDefaultAttributeValue(valueOption)};
  }
};

export const createMachineAttributeObj = (
  parentAttribute: MachineCategoryAttribute,
): MachineAttribute => {
  const {id: categoryAttributeId, valueOption} = parentAttribute;
  const valueWithOption = getAttrValueWithOption(valueOption);

  return {
    id: getUniqueId(),
    categoryAttributeId,
    ...valueWithOption,
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
  let i = 0;

  const sanitizedName = sanitizeString(name);

  if (sanitizedName.length === 0) {
    return false;
  }

  const sanitizedNames = names.map(_name => sanitizeString(_name));

  while (i < sanitizedNames.length) {
    if (sanitizedNames[i] === sanitizedName) {
      return false;
    }

    i++;
  }

  return true;
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
