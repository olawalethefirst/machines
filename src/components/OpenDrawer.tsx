import Ionicons from 'react-native-vector-icons/Ionicons';
import color from '../utils/color';
import Button from './Button';
import {StyleSheet} from 'react-native';
import {useNavigation, DrawerActions} from '@react-navigation/native';

const OpenDrawer = function () {
  const navigation = useNavigation();

  return (
    <Button
      style={styles.button}
      onPress={() => {
        navigation.dispatch(DrawerActions.openDrawer());
      }}>
      <Ionicons name="ios-menu" color={color('darkPurple')} size={28} />
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 0,
    paddingHorizontal: 12,
    flexGrow: 1,
    justifyContent: 'center',
  },
});

export default OpenDrawer;
