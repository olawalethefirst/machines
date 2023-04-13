import {FC, PropsWithChildren, useState, useMemo, useCallback} from 'react';
import {StyleProp, StyleSheet, TextInput, ViewStyle} from 'react-native';
import color from '../utils/color';

interface InputProps extends PropsWithChildren {
  style?: StyleProp<ViewStyle>;
  label: string;
  value: string;
  inputError?: string;
  onChangeText: (text: string) => void;
  onFocusInput?: (...args: any[]) => void;
  onBlurInput?: (...args: any[]) => void;
}

const Input: FC<InputProps> = function ({
  label,
  style,
  value,
  onChangeText,
  inputError,
  onFocusInput,
  onBlurInput,
}) {
  const [focussed, setFocussed] = useState(false);

  const inputStyle = useMemo(
    () => [
      styles.input,
      focussed
        ? styles.focussedInput
        : inputError && inputError?.length > 0
        ? styles.inputError
        : null,
      style,
    ],
    [focussed, inputError, style],
  );

  const onFocus = useCallback(() => {
    if (onFocusInput) {
      onFocusInput();
    }
    setFocussed(true);
  }, [onFocusInput]);
  const onBlur = useCallback(() => {
    if (onBlurInput) {
      onBlurInput();
    }
    setFocussed(false);
  }, [onBlurInput]);

  return (
    <TextInput
      style={inputStyle}
      placeholder={focussed ? '' : label}
      value={value}
      onChangeText={onChangeText}
      onFocus={onFocus}
      onBlur={onBlur}
      placeholderTextColor={color('darkGrey')}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    alignSelf: 'stretch',
    borderWidth: 1,
    borderColor: color('darkGrey'),
    backgroundColor: color('lightGrey'),
    padding: 16,
    fontSize: 14,
    fontWeight: '600',
  },
  focussedInput: {
    borderColor: color('lightPurple'),
  },
  inputError: {
    borderColor: color('red'),
  },
});

export default Input;
