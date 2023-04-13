import LabelledInput from './LabelledInput';
import {FC} from 'react';

interface Props {
  name: string;
  id: string;
  value: string | number;
}

const TextOrNumber: FC<Props> = function ({name, value, id, valueType}) {
  return (
    <LabelledInput
      onChangeText={() => {}}
      value={String(value ?? '')}
      label={name}
    />
  );
};

export default TextOrNumber;
