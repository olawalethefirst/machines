import {FC} from 'react';
import Column from './layout/Column';
import {StyleSheet, Text} from 'react-native';
import color from '../utils/color';

interface Props {
  listEmptyNote: string;
}

const ListEmpty: FC<Props> = function ({listEmptyNote}) {
  return (
    <Column>
      <Text style={styles.listEmptyText}>{listEmptyNote}</Text>
    </Column>
  );
};

const styles = StyleSheet.create({
  listEmptyText: {
    color: color('black'),
    fontSize: 16,
  },
});

export default ListEmpty;
