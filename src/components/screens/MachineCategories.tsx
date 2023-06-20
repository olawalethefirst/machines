import Screen from '../Screen';
import List from '../List';
import {useContext, useCallback} from 'react';
import MachineContext from '../../context/MachinesContext';
import {Context} from '../../context/useMachines';
import MachineCategory from '../MachineCategory';
import Add from '../Add';
import {MachineCategory as MachineCategoryType} from '../../types';
import ListEmpty from '../ListEmpty';

import createMachineCategory from '../../context/actions/createMachineCategory';

const MachineCategories = function () {
  const context = useContext(MachineContext) as Context;

  const {
    state: {machineCategories},
    dispatch,
  } = context;

  const renderItem = useCallback(
    ({item}: {item: MachineCategoryType; index: number}) => (
      <MachineCategory item={item} dispatch={dispatch} />
    ),
    [dispatch],
  );

  return (
    <Screen>
      <List
        ListEmptyComponent={<ListEmpty listEmptyNote="No Machine category" />}
        data={machineCategories}
        renderItem={renderItem}
      />
      <Add
        onPress={() => {
          createMachineCategory(dispatch)();
        }}
        rightBottomPosition={true}
      />
    </Screen>
  );
};

export default MachineCategories;
