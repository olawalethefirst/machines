import {
  StyleProp,
  ViewStyle,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  Text,
} from 'react-native';
import {FC, PropsWithChildren, forwardRef, memo} from 'react';
import color from '../utils/color';
import ModalDropdown from 'react-native-modal-dropdown';

interface ButtonComponentProps {
  touchableProps: TouchableOpacityProps;
  renderChildren: React.FC;
  childrenProps?: {
    [key: string]: any;
  };
}
interface DropdownProps extends PropsWithChildren {
  containerStyle?: StyleProp<ViewStyle>;
  dropdownStyle?: StyleProp<ViewStyle>;
  options: any[];
  defaultOption?: any;
  onSelectOption: (ind: string, val: any) => void;
  renderButtonProps?: ButtonComponentProps;
  renderRowText?: (rowItem: any) => string;
}

const renderButtonComponent = forwardRef<
  TouchableOpacity,
  ButtonComponentProps
>(function (props, ref) {
  const {childrenProps, touchableProps, renderChildren, ...otherProps} = props;
  const Child = renderChildren || Text;
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      ref={ref}
      {...touchableProps}
      {...otherProps}>
      <Child {...(childrenProps || {})} />
    </TouchableOpacity>
  );
});

const Dropdown: FC<DropdownProps> = function ({
  defaultOption,
  onSelectOption,
  options,
  children,
  containerStyle,
  dropdownStyle,
  renderButtonProps,
  renderRowText,
}) {
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
      defaultValue={defaultOption}
      options={options}
      defaultIndex={options.findIndex(option => option === defaultOption)}
      onSelect={onSelectOption}
      style={containerStyle}
      dropdownStyle={dropdownStyles}
      dropdownTextStyle={styles.dropdownText}
      dropdownTextHighlightStyle={styles.dropdownTextHighlight}
      dropdownTextProps={{numberOfLines: 1}}
      // Todo: try to fix this
      renderButtonComponent={renderButtonComponent as unknown as FC}
      renderButtonProps={renderButtonProps}
      renderRowText={renderRowText}>
      {children}
    </ModalDropdown>
  );
};

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

export default memo(Dropdown);
