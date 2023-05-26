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
    lastUniqueName: '',
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
      lastUniqueName: '',
      nameUnique: true,
      titleAttributeId: attribute.id,
      attributes: {
        [attribute.id]: attribute,
      },
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
  parentMachineAttributes: {[key: string]: MachineCategoryAttribute},
): Machine => {
  const attributes: {[key: string]: MachineAttribute} = {};

  for (let i in parentMachineAttributes) {
    const machineAttribute = createMachineAttributeObj(
      parentMachineAttributes[i],
    );
    attributes[machineAttribute.id] = machineAttribute;
  }

  return {
    id: getUniqueId(),
    categoryId,
    attributes,
  };
};

export const isNameUnique = (
  id: string,
  name: string,
  collection: (MachineCategory | MachineCategoryAttribute)[],
) => {
  let i = 0;

  const sanitizedName = sanitizeString(name);

  if (sanitizedName.length === 0) {
    return false;
  }

  while (i < collection.length) {
    const currentItem = collection[i];

    if (
      sanitizeString(currentItem.name) === sanitizedName &&
      currentItem.id !== id
    ) {
      return false;
    }

    i++;
  }

  return true;
};

export const shouldDeleteCategoryAttribute = (
  categoryAttributes: {[key: string]: MachineCategoryAttribute},
  attributeId: string,
) => {
  const attributesArr = Object.values(categoryAttributes);

  if (attributesArr.length <= minAttributesCount) {
    return false;
  }

  const remainingTextAttributes = attributesArr.filter(
    attribute =>
      attribute.valueOption === 'text' && attribute.id !== attributeId,
  );

  return remainingTextAttributes.length > 0;
};

export const shouldChangeAttributeOption = (
  categoryAttributes: {[key: string]: MachineCategoryAttribute},
  attributeId: string,
  attributeOption: AttributeValueOptions,
) => {
  const attributesArr = Object.values(categoryAttributes);

  if (attributeOption === 'text') {
    return true;
  }

  const remainingTextAttributes = attributesArr.filter(
    attribute =>
      attribute.valueOption === 'text' && attribute.id !== attributeId,
  );

  return remainingTextAttributes.length > 0;
};
