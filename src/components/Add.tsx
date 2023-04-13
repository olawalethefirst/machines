import Button from './Button';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import color from '../utils/color';
import {StyleProp, StyleSheet, ViewStyle} from 'react-native';
import {FC} from 'react';

const Add: FC<{onPress: () => void; buttonStyle?: StyleProp<ViewStyle>}> =
  function ({onPress, buttonStyle}) {
    return (
      <Button style={[styles.button, buttonStyle]} onPress={onPress}>
        <EntypoIcon name="plus" color={color('white')} size={28} />
      </Button>
    );
  };

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: color('darkPurple'),
    position: 'absolute',
    bottom: 60,
    right: 40,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Add;
