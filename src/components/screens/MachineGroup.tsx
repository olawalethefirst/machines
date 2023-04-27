import Screen from '../Screen';
import List from '../List';
import {useContext, useCallback, memo} from 'react';
import MachineContext from '../../context/MachinesContext';
import Machine from '../Machine';
import Add from '../Add';
import {Context} from '../../context/useMachines';
import {useRoute, RouteProp} from '@react-navigation/native';
import {Machine as MachineType, MachineCategory} from '../../types';
import ListEmpty from '../ListEmpty';

interface Params {
  [key: string]: {
    categoryId: string;
  };
}
type Route = RouteProp<Params, string>;

const MachineGroup = function () {
  const context = useContext(MachineContext) as Context;
  const route = useRoute<Route>();
  const categoryId = route.params.categoryId;
  const {
    state: {machines, machineCategories},
    createMachine,
    updateAttributeValue,
    deleteMachine,
  } = context;
  const category = machineCategories.find(
    _category => _category.id === categoryId,
  ) as MachineCategory;

  const renderItem = useCallback(
    ({item}: {item: MachineType}) => (
      <Machine
        machine={item}
        categoryId={categoryId}
        updateAttributeValue={updateAttributeValue}
        deleteMachine={deleteMachine}
        category={category}
      />
    ),
    [categoryId, updateAttributeValue, deleteMachine, category],
  );

  return (
    <Screen>
      <List
        ListEmptyComponent={<ListEmpty listEmptyNote="No Machine" />}
        data={machines[categoryId]}
        renderItem={renderItem}
      />
      <Add
        onPress={() => {
          createMachine(categoryId, category.attributes);
        }}
      />
    </Screen>
  );
};

export default memo(MachineGroup);
