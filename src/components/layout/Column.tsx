import {View, StyleSheet, StyleProp, ViewStyle} from 'react-native';
import {FC, PropsWithChildren} from 'react';

interface ColumnProps extends PropsWithChildren {
  style?: StyleProp<ViewStyle>;
}

const Column: FC<ColumnProps> = function ({children, style}) {
  return <View style={[styles.column, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  column: {
    padding: 12,
  },
});

export default Column;
