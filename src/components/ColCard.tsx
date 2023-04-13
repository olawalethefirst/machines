import {
  StyleProp,
  ViewStyle,
  useWindowDimensions,
  StyleSheet,
} from 'react-native';
import {FC, PropsWithChildren} from 'react';
import Column from './layout/Column';
import {maxColWidth} from '../constants';

interface ColCardProps extends PropsWithChildren {
  style?: StyleProp<ViewStyle>;
}

const ColCard: FC<ColCardProps> = function ({children, style}) {
  const {width} = useWindowDimensions();

  const colCardStyle = {
    width: width > maxColWidth ? '50%' : '100%',
  };

  return (
    <Column style={[styles.column, colCardStyle, style]}>{children}</Column>
  );
};

const styles = StyleSheet.create({
  column: {
    overflow: 'visible',
  },
});

export default ColCard;
