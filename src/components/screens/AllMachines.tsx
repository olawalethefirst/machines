import Screen from '../Screen';
import {extractKey} from '../List';
import {useContext, useCallback, memo, FC, useMemo} from 'react';
import MachineContext from '../../context/MachinesContext';
import {Context} from '../../context/useMachines';
import Machine from '../Machine';
import {Text, StyleSheet, SectionList} from 'react-native';
import color from '../../utils/color';
import Column from '../layout/Column';
import {Machine as MachineType} from '../../types';
import Spacer from '../layout/Spacer';
import Add from '../Add';
import {MachineCategory} from '../../types';
import getCategoryName from '../../utils/getCategoryName';
import Dropdown from '../Dropdown';
import List from '../List';
import ListEmpty from '../ListEmpty';
import AddIcon from './AddIcon';

const sortMachines = (
  machines: {[key: string]: MachineType[]},
  renderListItem: ({
    item,
    index,
  }: {
    item: MachineType;
    index: number;
  }) => JSX.Element,
) => {
  const data = [];

  for (const i in machines) {
    data.push({
      title: i,
      data: [machines[i]],
      renderItem: ({item}: {item: MachineType[]}) => (
        <List
          ListEmptyComponent={<ListEmpty listEmptyNote="No Machine" />}
          data={item}
          renderItem={renderListItem}
        />
      ),
    });
  }

  return data;
};

const renderSectionFooter = () => <Spacer value={50} />;
const AddButton: FC<{
  categories: string[];
  onSelectCategory: (index: string) => void;
}> = ({categories, onSelectCategory}) => {
  if (categories.length < 1) {
    return null;
  }

  if (categories.length < 2) {
    return (
      <Add
        onPress={() => {
          onSelectCategory('0');
        }}
      />
    );
  }

  return (
    <Dropdown
      containerStyle={styles.dropdownModal}
      dropdownStyle={styles.dropdown}
      options={categories}
      onSelectOption={onSelectCategory}
      renderButtonProps={{
        touchableProps: {style: styles.addButton},
        renderChildren: AddIcon,
      }}
    />
  );
};

const AllMachines = function () {
  const context = useContext(MachineContext) as Context;

  const {
    state: {machineCategories, machines},
    createMachine,
    updateAttributeValue,
    deleteMachine,
  } = context;
  const renderSectionHeader: FC<{section: {title: string}}> = useCallback(
    ({section: {title}}) => (
      <Column style={styles.sectionTitleContainer}>
        <Text style={styles.sectionTitle}>
          {getCategoryName(
            machineCategories.find(
              category => category.id === title,
            ) as MachineCategory,
          )}
        </Text>
      </Column>
    ),
    [machineCategories],
  );
  const renderItem = useCallback(
    ({item}: {item: MachineType}) => {
      const category = machineCategories.find(
        _category => _category.id === item.categoryId,
      ) as MachineCategory;
      return (
        <Machine
          machine={item}
          categoryId={category.id}
          updateAttributeValue={updateAttributeValue}
          deleteMachine={deleteMachine}
          category={category}
        />
      );
    },
    [machineCategories, updateAttributeValue, deleteMachine],
  );
  const onCreateMachine = useCallback(
    (category: MachineCategory) => {
      createMachine(category.id, category.attributes);
    },
    [createMachine],
  );
  const onSelectCategory = useCallback(
    (index: string) => {
      onCreateMachine(machineCategories[parseInt(index, 10)]);
    },
    [onCreateMachine, machineCategories],
  );

  const machineSections = useMemo(
    () => sortMachines(machines, renderItem),
    [machines, renderItem],
  );
  const categoryNames = useMemo(
    () => machineCategories.map(category => getCategoryName(category)),
    [machineCategories],
  );

  return (
    <Screen>
      <SectionList
        sections={machineSections}
        keyExtractor={extractKey}
        renderSectionHeader={renderSectionHeader}
        renderSectionFooter={renderSectionFooter}
        ListEmptyComponent={<ListEmpty listEmptyNote="No Machine Category" />}
      />
      <AddButton
        categories={categoryNames}
        onSelectCategory={onSelectCategory}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  sectionTitleContainer: {
    backgroundColor: color('offWhiteBackground'),
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    textTransform: 'capitalize',
    color: color('black'),
  },
  button: {
    backgroundColor: color('lightPurple'),
    alignSelf: 'center',
  },
  buttonText: {
    color: color('white'),
    fontSize: 14,
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  dropdownModal: {
    position: 'absolute',
    bottom: 60,
    right: 40,
  },
  dropdown: {borderWidth: 1, borderColor: color('lightPurple'), maxWidth: 200},
  addButton: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: color('darkPurple'),
    position: 'absolute',
    bottom: 60,
    // Todo: remove this if it works
    // bottom: 0,
    // left: 0,
    // position: 'relative',
    right: 40,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default memo(AllMachines);
