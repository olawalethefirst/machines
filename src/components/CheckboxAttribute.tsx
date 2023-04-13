import {Switch, View, Text, StyleSheet} from 'react-native';
import color from '../utils/color';
import {FC} from 'react';

interface Props {
  name: string;
  value: boolean;
  updateValue: (value: boolean) => void;
}

const CheckboxAttribute: FC<Props> = function ({value, name, updateValue}) {
  return (
    <View style={styles.container}>
      <Switch
        trackColor={{false: color('lightGrey'), true: color('lightPurple')}}
        thumbColor={value ? color('lightGrey') : color('white')}
        onValueChange={updateValue}
        value={value}
      />
      <Text ellipsizeMode="tail" style={styles.text} numberOfLines={1}>
        {name}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: color('lightGrey'),
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 16,
  },
  text: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: color('darkGrey'),
    textTransform: 'capitalize',
  },
});

export default CheckboxAttribute;
