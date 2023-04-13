import {createDrawerNavigator} from '@react-navigation/drawer';
import AllMachines from './screens/AllMachines';
import MachineCategories from './screens/MachineCategories';
import MachineGroup from './screens/MachineGroup';
import {NavigationContainer} from '@react-navigation/native';
import MachineContext from '../context/MachinesContext';
import {useContext} from 'react';
import color from '../utils/color';
import OpenDrawer from './OpenDrawer';
import {Context} from '../context/useMachines';
import getCategoryName from '../utils/getCategoryName';

const Drawer = createDrawerNavigator();

function MachinesDrawer() {
  const context = useContext(MachineContext) as Context;
  const {
    state: {machineCategories},
  } = context;

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
        {machineCategories.map(category => {
          return (
            <Drawer.Screen
              key={category.id}
              name={getCategoryName(category)}
              component={MachineGroup}
              options={{
                drawerLabelStyle: {marginLeft: 12, textTransform: 'capitalize'},
              }}
              initialParams={{
                categoryId: category.id,
              }}
            />
          );
        })}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default MachinesDrawer;
