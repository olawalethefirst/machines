import Screen from '../Screen';
import List from '../List';
import {useContext, useCallback} from 'react';
import MachineContext from '../../context/MachinesContext';
import {Context} from '../../context/useMachines';
import MachineCategory from '../MachineCategory';
import Add from '../Add';
import {MachineCategory as MachineCategoryType} from '../../types';
import ListEmpty from '../ListEmpty';

const MachineCategories = function () {
  const context = useContext(MachineContext) as Context;

  const {
    state: {machineCategories},
    updateMachineCategoryName,
    createMachineCategory,
    updateAttributeName,
    updateAttributeValueOption,
    createMachineAttribute,
    deleteMachineAttribute,
    deleteMachineCategory,
    clearCategoryError,
    updateMachineTitleAttribute,
  } = context;

  const renderItem = useCallback(
    ({item}: {item: MachineCategoryType; index: number}) => (
      <MachineCategory
        updateAttributeName={updateAttributeName}
        updateAttributeValueOption={updateAttributeValueOption}
        createMachineAttribute={createMachineAttribute}
        deleteMachineAttribute={deleteMachineAttribute}
        clearCategoryError={clearCategoryError}
        deleteCategory={deleteMachineCategory}
        item={item}
        updateMachineCategoryName={updateMachineCategoryName}
        updateMachineTitleAttribute={updateMachineTitleAttribute}
      />
    ),
    [
      updateAttributeName,
      updateAttributeValueOption,
      createMachineAttribute,
      deleteMachineAttribute,
      clearCategoryError,
      deleteMachineCategory,
      updateMachineCategoryName,
      updateMachineTitleAttribute,
    ],
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
          createMachineCategory();
        }}
      />
    </Screen>
  );
};

export default MachineCategories;
