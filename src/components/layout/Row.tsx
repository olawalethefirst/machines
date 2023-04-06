import {View, StyleSheet, StyleProp, ViewStyle} from 'react-native';
import {FC, PropsWithChildren} from 'react';

interface RowProps extends PropsWithChildren {
  style?: StyleProp<ViewStyle>;
}

const Row: FC<RowProps> = function ({children, style}) {
  return <View style={[styles.row, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default Row;
