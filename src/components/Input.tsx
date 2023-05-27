import {FC, PropsWithChildren, memo, useRef} from 'react';
import {
  StyleProp,
  StyleSheet,
  TextInput,
  View,
  ViewStyle,
  Animated,
} from 'react-native';
import color from '../utils/color';

interface InputProps extends PropsWithChildren {
  inputStyle?: StyleProp<ViewStyle>;
  label: string;
  value: string;
  onValueUpdate: (value: string) => void;
  inputError?: boolean;
  onFocusInput?: () => void;
  onBlurInput?: () => void;
}

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

const Input: FC<InputProps> = function ({
  label,
  inputStyle,
  value,
  onValueUpdate,
  inputError,
  onFocusInput,
  onBlurInput,
}) {
  const focussed = useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      <View>
        {false || value ? (
          <Animated.Text
            style={[
              styles.label,
              {
                color: focussed.interpolate({
                  inputRange: [0, 1],
                  outputRange: [
                    inputError ? color('red') : color('darkGrey'),
                    color('lightPurple'),
                  ],
                }),
              },
            ]}>
            {label}
          </Animated.Text>
        ) : null}

        <AnimatedTextInput
          style={[
            styles.input,
            {
              borderColor: focussed.interpolate({
                inputRange: [0, 1],
                outputRange: [
                  inputError ? color('red') : color('darkGrey'),
                  color('lightPurple'),
                ],
              }),
            },
            inputStyle,
          ]}
          placeholder={label}
          value={value}
          onChangeText={onValueUpdate}
          onFocus={() => {
            focussed.setValue(1);
            onFocusInput && onFocusInput();
          }}
          onBlur={() => {
            focussed.setValue(0);
            onBlurInput && onBlurInput();
          }}
          placeholderTextColor={color('darkGrey')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    paddingVertical: 8,
  },
  label: {
    position: 'absolute',
    zIndex: 1,
    top: -7,
    left: 4,
    height: 14,
    maxWidth: '90%',
    overflow: 'hidden',

    backgroundColor: 'white',
    paddingHorizontal: 2,

    fontSize: 14,
    lineHeight: 14,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  focussedLabel: {color: color('lightPurple')},

  input: {
    alignSelf: 'stretch',
    borderWidth: 1,
    backgroundColor: color('lightGrey'),
    padding: 16,
    fontSize: 14,
    fontWeight: '600',
  },
});

export default memo(Input);
