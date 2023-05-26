import {FC} from 'react';
import EntypoIcon from 'react-native-vector-icons/Entypo';

import colorFn from '../../utils/color';
import {Color} from '../../types';

const AddIcon: FC<{color?: Color; size?: number}> = function ({
  color = 'white',
  size = 28,
}) {
  return <EntypoIcon name="plus" color={colorFn(color)} size={size} />;
};

export default AddIcon;
