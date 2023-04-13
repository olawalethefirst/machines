import {StyleProp, ViewStyle} from 'react-native';
import {FC, PropsWithChildren, forwardRef, Ref} from 'react';
import {AttributeValueOptions} from '../types';
import {attributeValueOptions} from '../constants';
import ModalDropdown from 'react-native-modal-dropdown';
import Dropdown from './Dropdown';

interface AttributeOptionsProps extends PropsWithChildren {
  containerStyle?: StyleProp<ViewStyle>;
  onSelectOption: (ind: string, val: string) => void;
  defaultOption?: AttributeValueOptions;
  ref: Ref<ModalDropdown<'number' | 'text' | 'checkbox' | 'date'>>;
}

const options = [...attributeValueOptions];

const AttributeOptions: FC<AttributeOptionsProps> = forwardRef(function (
  {defaultOption, onSelectOption, children, containerStyle},
  ref,
) {
  return (
    <Dropdown
      ref={ref}
      defaultOption={defaultOption}
      options={options}
      onSelectOption={onSelectOption}
      containerStyle={containerStyle}>
      {children}
    </Dropdown>
  );
});

export default AttributeOptions;
