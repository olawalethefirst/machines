import {
  MachineAttribute as MachineAttributeType,
  AttributeValue,
} from '../types';
import {FC} from 'react';
import LabelledInput from './LabelledInput';
import CheckboxAttribute from './CheckboxAttribute';
import DateAttribute from './DateAttribute';
import getAttributeName from '../utils/getAttributeName';

interface Props {
  attribute: MachineAttributeType;
  updateValue: (value: AttributeValue) => void;
}

const MachineAttribute: FC<Props> = function ({attribute, updateValue}) {
  switch (attribute.valueOption) {
    case 'text':
      return (
        <LabelledInput
          label={getAttributeName(attribute.name)}
          value={attribute.value}
          onChangeText={updateValue}
        />
      );
    case 'number':
      return (
        <LabelledInput
          label={getAttributeName(attribute.name)}
          value={attribute.value}
          onChangeText={updateValue}
        />
      );
    case 'checkbox':
      return (
        <CheckboxAttribute
          name={getAttributeName(attribute.name)}
          value={attribute.value}
          updateValue={updateValue}
        />
      );
    case 'date':
      return (
        <DateAttribute
          date={attribute.value}
          name={getAttributeName(attribute.name)}
          updateDate={updateValue}
        />
      );
    default:
      return <></>;
  }
};

export default MachineAttribute;
