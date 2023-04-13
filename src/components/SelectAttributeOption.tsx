import {Text, StyleSheet} from 'react-native';
import Button from './Button';
import {FC, useRef} from 'react';
import {AttributeValueOptions} from '../types';
import color from '../utils/color';
import ModalDropdown from 'react-native-modal-dropdown';
import AttributeOptions from './AttributeOptions';

interface Props {
  onChangeValueType: (ind: string, val: string) => void;
  valueType: AttributeValueOptions;
}

const SelectAttributeOption: FC<Props> = function ({
  valueType,
  onChangeValueType,
}) {
  const dropdownRef = useRef<ModalDropdown<AttributeValueOptions>>(null);

  return (
    <AttributeOptions
      onSelectOption={onChangeValueType}
      defaultOption={valueType}
      ref={dropdownRef}>
      <Button
        style={styles.button}
        onPress={() => {
          dropdownRef.current?.show();
        }}>
        <Text style={styles.text}>{valueType}</Text>
      </Button>
    </AttributeOptions>
  );
};

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderColor: color('lightPurple'),
  },
  text: {
    fontSize: 14,
    textTransform: 'uppercase',
    fontWeight: '500',
    color: color('darkPurple'),
  },
});

export default SelectAttributeOption;
