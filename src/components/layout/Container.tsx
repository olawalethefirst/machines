import {View, StyleSheet, StyleProp, ViewStyle} from 'react-native';
import {FC, PropsWithChildren} from 'react';

interface ContainerProps extends PropsWithChildren {
  style?: StyleProp<ViewStyle>;
}

const Container: FC<ContainerProps> = function ({children, style}) {
  return <View style={[styles.container, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
});

export default Container;
