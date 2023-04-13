import {StyleProp, ViewStyle, StyleSheet} from 'react-native';
import {FC, PropsWithChildren, forwardRef, Ref} from 'react';
import color from '../utils/color';
import ModalDropdown from 'react-native-modal-dropdown';

interface DropdownProps extends PropsWithChildren {
  containerStyle?: StyleProp<ViewStyle>;
  dropdownStyle?: StyleProp<ViewStyle>;
  options: string[];
  defaultOption?: string;
  onSelectOption: (ind: string, val: string) => void;
  ref: Ref<ModalDropdown>;
}

const Dropdown: FC<DropdownProps> = forwardRef(function (
  {
    defaultOption,
    onSelectOption,
    options,
    children,
    containerStyle,
    dropdownStyle,
  },
  ref,
) {
  const dropdownStyles = [
    styles.dropdown,
    dropdownStyle,
    options.length <= 1
      ? styles.dropDownWith1
      : options.length === 2
      ? styles.dropdownWith2
      : null,
  ];

  return (
    <ModalDropdown
      ref={ref}
      defaultValue={defaultOption}
      options={options}
      defaultIndex={options.findIndex(option => option === defaultOption)}
      onSelect={onSelectOption}
      style={containerStyle}
      dropdownStyle={dropdownStyles}
      dropdownTextStyle={styles.dropdownText}
      dropdownTextHighlightStyle={styles.dropdownTextHighlight}
      dropdownTextProps={{numberOfLines: 1}}>
      {children}
    </ModalDropdown>
  );
});

const styles = StyleSheet.create({
  dropdown: {
    height: 100,
    width: 150,
    borderWidth: 1,
    borderColor: color('darkGrey'),
  },
  dropDownWith1: {
    height: 35,
  },
  dropdownWith2: {
    height: 65,
  },
  dropdownText: {
    fontSize: 12,
    backgroundColor: color('lightGrey'),
    color: color('lightPurple'),
    fontWeight: '600',
  },
  dropdownTextHighlight: {
    color: color('darkPurple'),
  },
});

export default Dropdown;
