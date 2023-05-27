import {FC, PropsWithChildren, useState} from 'react';
import {Menu, Divider} from 'react-native-paper';

interface DropdownProps<T> extends PropsWithChildren {
  menuOptions: T[];
  onSelectOption: (option: T) => void;
  MenuButton: FC<any>;
  menuButtonProps?: {[key: string]: any};
  renderOptionText?: (option: T) => string;
}

const Dropdown = function <T>({
  menuOptions,
  MenuButton,
  renderOptionText,
  onSelectOption,
  menuButtonProps = {},
}: DropdownProps<T>) {
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      anchor={<MenuButton onPress={openMenu} {...menuButtonProps} />}>
      {menuOptions.map(option => (
        <Menu.Item
          key={renderOptionText ? renderOptionText(option) : (option as string)}
          onPress={() => {
            onSelectOption(option);
            closeMenu();
          }}
          title={
            renderOptionText ? renderOptionText(option) : (option as string)
          }
        />
      ))}

      {/* <Divider /> */}
    </Menu>
  );
};
export default Dropdown;
