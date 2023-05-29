import {StyleSheet} from 'react-native';
import {
  Machine as MachineType,
  AttributeValue,
  MachineCategory,
} from '../types';
import {FC, memo, useMemo} from 'react';
import {View} from 'react-native';
import MachineAttribute from './MachineAttribute';
import {UpdateAttributeValue} from '../context/actions/updateAttributeValue';
import {DeleteMachine as DeleteMachineType} from '../context/actions/deleteMachine';
import DeleteIcon from './DeleteIcon';
import {Card, Text, Button} from 'react-native-paper';

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
    const machineAttributes = machine.attributes;

    for (let machineAttributeKey in machineAttributes) {
      const machineAttribute = machineAttributes[machineAttributeKey];
      if (machineAttribute.categoryAttributeId === category.titleAttributeId) {
        return machineAttribute.value.toString();
      }
    }

    return '';
  }, [machine.attributes, category.titleAttributeId]);

  const onUpdateAttributeValue = (
    attributeId: string,
    value: AttributeValue,
  ) => {
    updateAttributeValue(attributeId, machine.id, value, categoryId);
  };
  const onDeleteMachine = () => {
    deleteMachine(machine.id, categoryId);
  };

  return (
    <Card style={[styles.cardContainer]} mode="elevated">
      <Text variant="titleLarge">
        {title.length > 0 ? title : 'Unnamed Machine'}
      </Text>

      {Object.values(machine.attributes).map(attribute => (
        <View key={attribute.id} style={styles.rowMargin}>
          <MachineAttribute
            attribute={attribute}
            updateValue={(value: AttributeValue) => {
              onUpdateAttributeValue(attribute.id, value);
            }}
            attributeName={
              category.attributes[attribute.categoryAttributeId].lastUniqueName
            }
          />
        </View>
      ))}

      <Button
        style={[styles.rowMargin, styles.alignItemStart]}
        icon={DeleteIcon}
        onPress={onDeleteMachine}
        labelStyle={styles.buttonLabel}>
        delete
      </Button>
    </Card>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    paddingVertical: 20,
    paddingHorizontal: 12,
    margin: 12,
    marginBottom: 6,
  },
  rowMargin: {
    marginTop: 20,
  },
  alignItemStart: {
    alignItems: 'flex-start',
  },
  buttonLabel: {fontWeight: 'bold', textTransform: 'uppercase'},
});

export default memo(Machine);
