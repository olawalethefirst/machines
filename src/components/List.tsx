import {
  FlatList,
  StyleProp,
  ViewStyle,
  useWindowDimensions,
} from 'react-native';
import {FC} from 'react';
import {maxColWidth} from '../constants';

interface Props {
  data: any[];
  renderItem: ({item, index}: {item: any; index: number}) => JSX.Element;
  style?: StyleProp<ViewStyle>;
  ListFooter?: FC | JSX.Element;
  ListEmptyComponent?: FC | JSX.Element;
  contentContainerStyle?: StyleProp<ViewStyle>;
  keyExtractor?: (item: any, index: number) => string;
}

export const extractKey = (item: any, i: number) => {
  const keyBase = `item-${i}`;
  let itemId = '';

  if (item.id) {
    itemId = item.id;
  }

  return keyBase + itemId;
};

const List: FC<Props> = function ({
  data,
  renderItem,
  keyExtractor,
  ListFooter,
  ListEmptyComponent,
}) {
  const {width} = useWindowDimensions();

  const numOfColumns = width > maxColWidth ? 2 : 1;

  return (
    <FlatList
      key={numOfColumns}
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor ?? extractKey}
      numColumns={numOfColumns}
      ListFooterComponent={ListFooter}
      ListEmptyComponent={ListEmptyComponent}
    />
  );
};

export default List;
