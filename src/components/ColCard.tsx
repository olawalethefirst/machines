import {StyleProp, ViewStyle, StyleSheet} from 'react-native';
import {FC, PropsWithChildren} from 'react';
import Column from './layout/Column';
import {maxCardSize} from '../constants';

interface ColCardProps extends PropsWithChildren {
  style?: StyleProp<ViewStyle>;
}

const ColCard: FC<ColCardProps> = function ({children, style}) {
  const colCardStyle = {
    maxWidth: maxCardSize,
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
