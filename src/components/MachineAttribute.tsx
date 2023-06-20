import {MachineAttribute as MachineAttributeType} from '../types';
import {FC, memo, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {TextInput, Switch, Button} from 'react-native-paper';
import DatePicker from 'react-native-date-picker';

import getAttributeName from '../utils/getAttributeName';

type UpdateString = (value: string) => void;
type UpdateBoolean = (value: boolean) => void;
type UpdateNumber = (value: number) => void;
interface Props {
  attribute: MachineAttributeType;
  updateValue: UpdateString | UpdateBoolean | UpdateNumber;
  attributeName: string;
}

const DateAttribute: FC<{
  name: string;
  date: number;
  updateDate: (date: number) => void;
}> = function ({date, updateDate, name}) {
  const [open, setOpen] = useState(false);

  return (
    <View style={styles.multiItemRow}>
      <TextInput
        mode="outlined"
        editable={false}
        label={name}
        value={date > 0 ? new Date(date).toDateString() : ''}
        style={styles.flex1}
      />
      <Button
        mode="elevated"
        onPress={() => setOpen(true)}
        labelStyle={styles.labelBold}>
        select
      </Button>

      <DatePicker
        modal
        open={open}
        date={date > 0 ? new Date(date) : new Date()}
        onConfirm={newDate => {
          setOpen(false);
          updateDate(newDate.valueOf());
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </View>
  );
};

const MachineAttribute: FC<Props> = function ({
  attribute,
  updateValue,
  attributeName,
}) {
  switch (attribute.valueOption) {
    case 'text':
      return (
        <TextInput
          mode="outlined"
          label={getAttributeName(attributeName)}
          value={attribute.value}
          onChangeText={updateValue as UpdateString}
        />
      );
    case 'number':
      return (
        <TextInput
          mode="outlined"
          label={getAttributeName(attributeName)}
          value={attribute.value}
          onChangeText={updateValue as UpdateString}
        />
      );
    case 'checkbox':
      return (
        <View style={styles.multiItemRow}>
          <TextInput
            mode="outlined"
            value={getAttributeName(attributeName)}
            editable={false}
            style={styles.flex1}
          />

          <Switch
            style={styles.transformScale1point5}
            onValueChange={updateValue as UpdateBoolean}
            value={attribute.value}
          />
        </View>
      );
    case 'date':
      return (
        <DateAttribute
          date={attribute.value}
          name={getAttributeName(attributeName)}
          updateDate={updateValue as UpdateNumber}
        />
      );
    default:
      return <></>;
  }
};

const styles = StyleSheet.create({
  multiItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  flex1: {
    flex: 1,
  },
  labelBold: {
    fontWeight: 'bold',
  },
  transformScale1point5: {
    transform: [{scale: 1.5}],
    marginRight: 10,
    marginLeft: 10,
  },
});

export default memo(MachineAttribute);
