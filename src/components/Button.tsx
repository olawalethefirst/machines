import {StyleProp, TouchableOpacity, ViewStyle, StyleSheet} from 'react-native';
import {FC, ReactNode} from 'react';

interface ButtonProps {
  style?: StyleProp<ViewStyle>;
  children: ReactNode;
  onPress: (...args: any[]) => void;
}

const Button: FC<ButtonProps> = function ({children, style, onPress}) {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={onPress}
      style={[styles.button, style]}>
      {children}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    padding: 16,
    alignItems: 'center',
  },
});
