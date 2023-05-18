import {createDrawerNavigator} from '@react-navigation/drawer';
import AllMachines from './screens/AllMachines';
import MachineCategories from './screens/MachineCategories';
import {NavigationContainer} from '@react-navigation/native';
import color from '../utils/color';
import OpenDrawer from './OpenDrawer';

const Drawer = createDrawerNavigator();

function MachinesDrawer() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          headerTitleAlign: 'left',
          headerTitleStyle: {
            textTransform: 'uppercase',
            fontSize: 18,
            color: color('lightPurple'),
            fontWeight: '600',
          },
          drawerActiveTintColor: color('lightPurple'),
          headerLeft: OpenDrawer,
        }}>
        <Drawer.Screen name="Categories" component={MachineCategories} />
        <Drawer.Screen name="Machines" component={AllMachines} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default MachinesDrawer;
