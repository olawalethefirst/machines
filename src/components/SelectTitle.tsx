import {Text, StyleSheet} from 'react-native';
import Button from './Button';
import {FC, useRef} from 'react';
import color from '../utils/color';
import ModalDropdown from 'react-native-modal-dropdown';
import Dropdown from './Dropdown';

interface Props {
  onChangeTitle: (ind: string, val: string) => void;
  title: string;
  options: string[];
}

const SelectTitle: FC<Props> = function ({title, onChangeTitle, options}) {
  const dropdownRef = useRef<ModalDropdown>(null);

  return (
    <Dropdown
      containerStyle={styles.dropdownContainer}
      options={options}
      onSelectOption={onChangeTitle}
      defaultOption={title}
      ref={dropdownRef}>
      <Button
        style={styles.button}
        onPress={() => {
          dropdownRef.current?.show();
        }}>
        <Text numberOfLines={1} style={styles.text}>
          {'Attribute title:     '}
          <Text style={styles.valueText}>{title}</Text>
        </Text>
      </Button>
    </Dropdown>
  );
};

const styles = StyleSheet.create({
  dropdownContainer: {
    flexGrow: 1,
  },
  button: {
    borderWidth: 1,
    borderColor: color('darkGrey'),
    backgroundColor: color('lightGrey'),
    alignItems: 'stretch',
  },
  text: {
    fontSize: 14,
    fontWeight: '600',
    color: color('darkGrey'),
    textTransform: 'capitalize',
  },
  valueText: {
    color: color('black'),
  },
});

export default SelectTitle;
