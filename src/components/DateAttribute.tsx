import {FC, useState} from 'react';
import DatePicker from 'react-native-date-picker';
import Button from './Button';
import {StyleSheet, Text} from 'react-native';
import color from '../utils/color';

interface Props {
  name: string;
  date: number;
  updateDate: (date: number) => void;
}

const DateAttribute: FC<Props> = function ({date, updateDate, name}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button style={styles.button} onPress={() => setOpen(true)}>
        <Text style={styles.text}>
          {name + ':   '}
          <Text style={styles.valueText}>
            {date > 0 ? new Date(date).toDateString() : null}
          </Text>
        </Text>
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
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    flexGrow: 1,
    borderWidth: 1,
    borderColor: color('darkGrey'),
    backgroundColor: color('lightGrey'),
    alignItems: 'stretch',
  },
  text: {
    textAlign: 'left',
    fontSize: 14,
    color: color('darkGrey'),
    fontWeight: '600',
  },
  valueText: {
    color: color('black'),
    fontWeight: '600',
  },
});

export default DateAttribute;
