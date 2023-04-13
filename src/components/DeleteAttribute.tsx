import Button from './Button';
import {ViewStyle, StyleProp} from 'react-native/types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {FC} from 'react';
import color from '../utils/color';
import {DeleteMachineAttribute} from '../context/actions/deleteMachineAttribute';

interface DeleteAttributeProps {
  onPress: DeleteMachineAttribute;
  containerStyle?: StyleProp<ViewStyle>;
}

const DeleteAttribute: FC<DeleteAttributeProps> = function ({
  onPress,
  containerStyle,
}) {
  return (
    <Button style={containerStyle} onPress={onPress}>
      <Icon name="delete" size={24} color={color('darkPurple')} />
    </Button>
  );
};

export default DeleteAttribute;
