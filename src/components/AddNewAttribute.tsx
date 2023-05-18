import {Text, StyleSheet} from 'react-native';
import Button from './Button';
import {FC, useRef, useCallback, memo} from 'react';
import {AttributeValueOptions} from '../types';
import color from '../utils/color';
import ModalDropdown from 'react-native-modal-dropdown';
import AttributeOptions from './AttributeOptions';

interface Props {
  addNewAttribute: (option: AttributeValueOptions) => void;
}

const AddNewAttribute: FC<Props> = function ({addNewAttribute}) {
  const dropdownRef = useRef<ModalDropdown<AttributeValueOptions>>(null);

  const onSelectOption = useCallback(
    (_: string, option: AttributeValueOptions) => {
      addNewAttribute(option);
    },
    [addNewAttribute],
  );

  return (
    <AttributeOptions onSelectOption={onSelectOption} ref={dropdownRef}>
      <Button
        style={styles.button}
        onPress={() => {
          dropdownRef.current?.show();
        }}>
        <Text style={styles.text}>add new field</Text>
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

export default memo(AddNewAttribute);
