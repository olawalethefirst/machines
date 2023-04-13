import {FC, PropsWithChildren, useState, useMemo, useCallback} from 'react';
import {
  StyleProp,
  StyleSheet,
  ViewStyle,
  View,
  Text,
  LayoutChangeEvent,
} from 'react-native';
import color from '../utils/color';
import Input from './Input';

interface LabelledInputProps extends PropsWithChildren {
  inputStyle?: StyleProp<ViewStyle>;
  label: string;
  value: string;
  inputError?: string;
  onChangeText: (text: string) => void;
  onFocus?: (...args: any[]) => void;
  onBlur?: (...args: any[]) => void;
}

const LabelledInput: FC<LabelledInputProps> = function ({
  label,
  value,
  onChangeText,
  inputStyle,
  inputError,
  onFocus,
  onBlur,
}) {
  const [isFocussed, setIsFocussed] = useState(false);
  const [labelWidth, setLabelWidth] = useState(0);
  const handleLabelLayout = (e: LayoutChangeEvent) => {
    setLabelWidth(e.nativeEvent.layout.width);
  };
  const onFocusInput = useCallback(() => {
    onFocus && onFocus();
    setIsFocussed(true);
  }, [onFocus]);
  const onBlurInput = useCallback(() => {
    onBlur && onBlur();
    setIsFocussed(false);
  }, [onBlur]);

  const hideBorderStyle = useMemo(
    () => ({
      width: labelWidth + 3,
    }),
    [labelWidth],
  );
  const labelStyle = useMemo(
    () => ({
      ...(isFocussed
        ? ({color: color('lightPurple'), fontWeight: '400'} as const)
        : {}),
    }),
    [isFocussed],
  );

  return (
    <View style={styles.container}>
      {isFocussed || value ? (
        <>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            onLayout={handleLabelLayout}
            style={[styles.label, labelStyle]}>
            {label}
          </Text>
          {labelWidth > 0 ? (
            <View style={[styles.hideBorder, hideBorderStyle]} />
          ) : null}
        </>
      ) : null}
      <Input
        style={inputStyle}
        label={label}
        value={value}
        inputError={inputError}
        onChangeText={onChangeText}
        onFocusInput={onFocusInput}
        onBlurInput={onBlurInput}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
  },
  label: {
    position: 'absolute',
    top: -4,
    left: 10,
    paddingHorizontal: 2,
    zIndex: 2,
    fontSize: 12,
    lineHeight: 12,
    color: color('darkGrey'),
    fontWeight: '600',
    maxWidth: '90%',
    textTransform: 'capitalize',
  },
  hideBorder: {
    position: 'absolute',
    top: -0.5,
    left: 8,
    zIndex: 1,
    borderBottomWidth: 2,
    borderBottomColor: color('white'),
  },
});

export default LabelledInput;
