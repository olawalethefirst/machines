import {View} from 'react-native';

function Spacer({
  isVertical = true,
  value,
}: {
  isVertical?: boolean;
  value: number;
}) {
  const style = {
    ...(isVertical ? {height: value} : {width: value}),
  };

  return <View style={style} />;
}

export default Spacer;
