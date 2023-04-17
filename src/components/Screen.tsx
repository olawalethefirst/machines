import {FC, PropsWithChildren} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import color from '../utils/color';

const Screen: FC<PropsWithChildren> = function ({children}) {
  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color('offWhiteBackground'),
  },
});

export default Screen;
