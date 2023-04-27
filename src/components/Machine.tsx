import ColCard from './ColCard';
import Column from './layout/Column';
import Row from './layout/Row';
import Spacer from './layout/Spacer';
import DeleteMachine from './DeleteMachine';
import {StyleSheet} from 'react-native';
import color from '../utils/color';
import {
  Machine as MachineType,
  MachineAttribute as MachineAttributeType,
  AttributeValue,
  MachineCategory,
  MachineCategoryAttribute,
} from '../types';
import {FC, useCallback, useMemo, memo} from 'react';
import {Text, View} from 'react-native';
import MachineAttribute from './MachineAttribute';
import {UpdateAttributeValue} from '../context/actions/updateAttributeValue';
import sanitizeString from '../utils/sanitizeString';
import {DeleteMachine as DeleteMachineType} from '../context/actions/deleteMachine';

interface Props {
  machine: MachineType;
  categoryId: string;
  updateAttributeValue: UpdateAttributeValue;
  deleteMachine: DeleteMachineType;
  category: MachineCategory;
}

const Machine: FC<Props> = function ({
  machine,
  categoryId,
  updateAttributeValue,
  deleteMachine,
  category,
}) {
  const title = useMemo(() => {
    return sanitizeString(
      (
        machine.attributes.find(
          attribute =>
            attribute.categoryAttributeId === category.titleAttributeId,
        ) as MachineAttributeType
      ).value as string,
    );
  }, [machine.attributes, category.titleAttributeId]);

  const onUpdateAttributeValue = useCallback(
    (attributeId: string, value: AttributeValue) => {
      updateAttributeValue(attributeId, machine.id, value, categoryId);
    },
    [updateAttributeValue, machine.id, categoryId],
  );
  const onDeleteMachine = useCallback(() => {
    deleteMachine(machine.id, categoryId);
  }, [deleteMachine, machine.id, categoryId]);

  console.log('updating item: ', machine.id);

  return (
    <ColCard>
      <Column style={styles.container}>
        <Row>
          <Text style={styles.title}>
            {title.length > 0 ? title : 'Unnamed Machine'}
          </Text>
        </Row>

        <Spacer value={12} />

        {machine.attributes.map(attribute => (
          <View key={attribute.id}>
            <Spacer value={12} />
            <Row style={[styles.multiItemRow, styles.alignItemsCenter]}>
              <MachineAttribute
                attribute={attribute}
                updateValue={(value: AttributeValue) => {
                  onUpdateAttributeValue(attribute.id, value);
                }}
                attributeName={
                  (
                    category.attributes.find(
                      categoryAttribute =>
                        categoryAttribute.id === attribute.categoryAttributeId,
                    ) as MachineCategoryAttribute
                  ).name
                }
              />
            </Row>
          </View>
        ))}

        <Spacer value={12} />

        <Row>
          <DeleteMachine onPress={onDeleteMachine} />
        </Row>
      </Column>
    </ColCard>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: color('black'),
    textTransform: 'capitalize',
  },
  container: {
    backgroundColor: color('white'),
    padding: 20,
  },
  attributeRow: {gap: 10},
  multiItemRow: {gap: 10, flexWrap: 'nowrap'},
  alignItemsCenter: {alignItems: 'center'},
});

export default memo(Machine);
