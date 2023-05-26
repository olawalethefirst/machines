import Button from './Button';
import {StyleProp, StyleSheet, ViewStyle} from 'react-native';
import {FC} from 'react';

import color from '../utils/color';
import AddIcon from './screens/AddIcon';

const Add: FC<{onPress?: () => void; style?: StyleProp<ViewStyle>}> =
  function ({onPress, style: buttonStyle}) {
    return (
      <Button style={[styles.button, buttonStyle]} onPress={onPress}>
        <AddIcon />
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
