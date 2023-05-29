import {StyleSheet} from 'react-native';
import {FC} from 'react';
import {IconButton} from 'react-native-paper';
import EntypoIcon from 'react-native-vector-icons/Entypo';

import colorFn from '../utils/color';
import color from '../utils/color';

const AddIcon = function () {
  return <EntypoIcon name="plus" color={colorFn('white')} size={28} />;
};

const Add: FC<{onPress?: () => void; rightBottomPosition?: boolean}> =
  function ({onPress, rightBottomPosition = false}) {
    return (
      <IconButton
        mode="contained"
        style={[
          addStyles.button,
          rightBottomPosition ? addStyles.absoluteButton : null,
        ]}
        onPress={onPress}
        icon={AddIcon}
        containerColor={color('darkPurple')}
        rippleColor={color('white')}
      />
    );
  };

export const addStyles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  absoluteButton: {
    position: 'absolute',
    bottom: 20,
    right: 25,
  },
});

export default Add;
