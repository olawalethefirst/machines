import Button from './Button';
import {Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {FC, memo} from 'react';
import color from '../utils/color';

interface DeleteMachineProps {
  onPress: () => void;
}

const DeleteMachine: FC<DeleteMachineProps> = function ({onPress}) {
  return (
    <Button style={styles.button} onPress={onPress}>
      <Icon name="delete" size={18} color={color('darkPurple')} />
      <Text style={styles.text}>delete</Text>
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
  },
  text: {
    color: color('darkPurple'),
    fontSize: 14,
    textTransform: 'uppercase',
    fontWeight: '500',
  },
});

export default memo(DeleteMachine);
