import {MachineAttribute as MachineAttributeType} from '../types';
import {FC, memo} from 'react';
import Input from './Input';
import CheckboxAttribute from './CheckboxAttribute';
import DateAttribute from './DateAttribute';
import getAttributeName from '../utils/getAttributeName';

type UpdateString = (value: string) => void;
type UpdateBoolean = (value: boolean) => void;
type UpdateNumber = (value: number) => void;
interface Props {
  attribute: MachineAttributeType;
  updateValue: UpdateString | UpdateBoolean | UpdateNumber;
  attributeName: string;
}

const MachineAttribute: FC<Props> = function ({
  attribute,
  updateValue,
  attributeName,
}) {
  switch (attribute.valueOption) {
    case 'text':
      return (
        <Input
          label={getAttributeName(attributeName)}
          value={attribute.value}
          onValueUpdate={updateValue as UpdateString}
        />
      );
    case 'number':
      return (
        <Input
          label={getAttributeName(attributeName)}
          value={attribute.value}
          onValueUpdate={updateValue as UpdateString}
        />
      );
    case 'checkbox':
      return (
        <CheckboxAttribute
          name={getAttributeName(attributeName)}
          value={attribute.value}
          updateValue={updateValue as UpdateBoolean}
        />
      );
    case 'date':
      return (
        <DateAttribute
          date={attribute.value}
          name={getAttributeName(attributeName)}
          updateDate={updateValue as UpdateNumber}
        />
      );
    default:
      return <></>;
  }
};

export default memo(MachineAttribute);
