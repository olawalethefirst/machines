import {StyleProp, ViewStyle, FlatList} from 'react-native';
import {FC} from 'react';

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
  const keyBase = 'item-';
  let itemId = '';

  if (item.id) {
    itemId = item.id;
  } else {
    itemId = i.toString();
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
  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor ?? extractKey}
      ListFooterComponent={ListFooter}
      ListEmptyComponent={ListEmptyComponent}
    />
  );
};

export default List;
