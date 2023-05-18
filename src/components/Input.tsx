import {
  FC,
  PropsWithChildren,
  useState,
  useMemo,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import {StyleProp, StyleSheet, TextInput, ViewStyle} from 'react-native';
import color from '../utils/color';

interface InputProps extends PropsWithChildren {
  style?: StyleProp<ViewStyle>;
  label: string;
  initialValue: string;
  inputError?: string;
  onFocusInput?: () => void;
  onBlurInput?: (text: string) => void;
  resetValueKey?: string;
}

const Input: FC<InputProps> = function ({
  label,
  style,
  initialValue,
  inputError,
  onFocusInput,
  onBlurInput,
  resetValueKey,
}) {
  const [value, setValue] = useState(initialValue);
  const [focussed, setFocussed] = useState(false);

  const initialValueRef = useRef(initialValue);
  const valueRef = useRef(initialValue);

  initialValueRef.current = initialValue;
  valueRef.current = value;

  useEffect(() => {
    resetValueKey &&
      valueRef.current !== initialValueRef.current &&
      setValue(initialValueRef.current);
  }, [resetValueKey]);

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

  const updateValue = (text: string) => {
    setValue(text);
  };
  const onFocus = useCallback(() => {
    onFocusInput && onFocusInput();
    setFocussed(true);
  }, [onFocusInput]);
  const onBlur = () => {
    onBlurInput && onBlurInput(value);
    setFocussed(false);
  };

  return (
    <TextInput
      style={inputStyle}
      placeholder={focussed ? '' : label}
      value={value}
      onChangeText={updateValue}
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
