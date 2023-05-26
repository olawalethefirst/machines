import {StyleProp, TouchableOpacity, ViewStyle, StyleSheet} from 'react-native';
import {forwardRef, PropsWithChildren} from 'react';

interface ButtonProps {
  style?: StyleProp<ViewStyle>;
  onPress?: (...args: any[]) => void;
}

const Button = forwardRef<TouchableOpacity, PropsWithChildren<ButtonProps>>(
  function ({children, style, onPress}, ref) {
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={onPress}
        style={[buttonStyles.button, style]}
        ref={ref}>
        {children}
      </TouchableOpacity>
    );
  },
);

export default Button;

export const buttonStyles = StyleSheet.create({
  button: {
    padding: 16,
    alignItems: 'center',
  },
});
