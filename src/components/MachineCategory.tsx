import ColCard from './ColCard';
import Column from './layout/Column';
import Row from './layout/Row';
import LabelledInput from './LabelledInput';
import Spacer from './layout/Spacer';
import DeleteAttribute from './DeleteAttribute';
import SelectAttributeOption from './SelectAttributeOption';
import AddNewAttribute from './AddNewAttribute';
import DeleteMachine from './DeleteMachine';
import SelectTitle from './SelectTitle';
import {StyleSheet} from 'react-native';
import color from '../utils/color';
import {
  MachineCategory as MachineCategoryType,
  AttributeValueOptions,
  MachineCategoryAttribute,
} from '../types';
import {FC, useCallback, useEffect, useMemo} from 'react';
import {Text, View} from 'react-native';
import {UpdateAttributeName} from '../context/actions/updateAttributeName';
import {UpdateAttributeValueOption} from '../context/actions/updateAttributeValueOption';
import {CreateMachineAttribute} from '../context/actions/createMachineAttribute';
import {DeleteMachineCategory} from '../context/actions/deleteMachineCategory';
import {DeleteMachineAttribute} from '../context/actions/deleteMachineAttribute';
import {ClearCategoryError} from '../context/actions/clearCategoryError';
import {errors} from '../constants';
import {ValidateMachineAttributeName} from '../context/actions/validateMachineAttributeName';
import {ValidateMachineCategoryName} from '../context/actions/validateMachineCategoryName';
import {UpdateMachineCategoryName} from '../context/actions/updateMachineCategoryName';
import {UpdateMachineTitleAttribute} from '../context/actions/updateMachineTitleAttribute';
import getCategoryName from '../utils/getCategoryName';

interface Props {
  item: MachineCategoryType;
  deleteCategory: DeleteMachineCategory;
  updateAttributeName: UpdateAttributeName;
  createMachineAttribute: CreateMachineAttribute;
  deleteMachineAttribute: DeleteMachineAttribute;
  updateAttributeValueOption: UpdateAttributeValueOption;
  clearCategoryError: ClearCategoryError;
  validateMachineCategoryName: ValidateMachineCategoryName;
  validateMachineAttributeName: ValidateMachineAttributeName;
  updateMachineCategoryName: UpdateMachineCategoryName;
  updateMachineTitleAttribute: UpdateMachineTitleAttribute;
}

const getAttributeName = (attribute: MachineCategoryAttribute) =>
  attribute.name.length > 0
    ? attribute.name
    : 'Unnamed Attribute - ' + attribute.id;

const parseTitleName = (
  attributes: MachineCategoryAttribute[],
  titleAttributeId: string,
) => {
  const titleAttribute = attributes.find(
    attribute => attribute.id === titleAttributeId,
  );

  return getAttributeName(titleAttribute as MachineCategoryAttribute);
};

const MachineCategory: FC<Props> = function ({
  item,
  updateAttributeName,
  updateAttributeValueOption,
  createMachineAttribute,
  deleteMachineAttribute,
  deleteCategory,
  clearCategoryError,
  validateMachineCategoryName,
  validateMachineAttributeName,
  updateMachineCategoryName,
  updateMachineTitleAttribute,
}) {
  const titleOptionsData = useMemo(
    () => item.attributes.filter(attribute => attribute.valueOption === 'text'),
    [item.attributes],
  );
  const titleOptions = titleOptionsData.map(attribute =>
    getAttributeName(attribute),
  );

  const onUpdateName = useCallback(
    (name: string) => {
      updateMachineCategoryName(item.id, name);
    },
    [updateMachineCategoryName, item.id],
  );
  const onUpdateTitleAttribute = useCallback(
    (i: string) => {
      updateMachineTitleAttribute(
        item.id,
        titleOptionsData[parseInt(i, 10)].id,
      );
    },
    [updateMachineTitleAttribute, item.id, titleOptionsData],
  );
  const onUpdateAttributeName = useCallback(
    (attributeId: string, name: string) => {
      updateAttributeName(attributeId, item.id, name);
    },
    [updateAttributeName, item.id],
  );
  const onUpdateAttributeOption = useCallback(
    (attributeId: string, option: AttributeValueOptions) => {
      updateAttributeValueOption(attributeId, item.id, option);
    },
    [updateAttributeValueOption, item.id],
  );
  const onCreateAttribute = useCallback(
    (valueOption: AttributeValueOptions) => {
      createMachineAttribute(item.id, valueOption);
    },
    [createMachineAttribute, item.id],
  );
  const onDeleteAttribute = useCallback(
    (attributeId: string) => {
      deleteMachineAttribute(attributeId, item.id);
    },
    [deleteMachineAttribute, item.id],
  );
  const onDeleteCategory = useCallback(() => {
    deleteCategory(item.id);
  }, [deleteCategory, item.id]);
  const onValidateMachineName = useCallback(() => {
    validateMachineCategoryName(item.id);
  }, [validateMachineCategoryName, item.id]);
  const onValidateAttributeName = useCallback(
    (attributeId: string) => {
      validateMachineAttributeName(attributeId, item.id);
    },
    [validateMachineAttributeName, item.id],
  );

  useEffect(() => {
    if (item.error.length > 0) {
      setTimeout(() => {
        clearCategoryError(item.id);
      }, 5000);
    }
  }, [item.error, clearCategoryError, item.id]);

  return (
    <ColCard>
      <Column style={styles.container}>
        <Row>
          <Text numberOfLines={1} style={styles.title}>
            {getCategoryName(item)}
          </Text>
        </Row>

        <Row>
          <Text
            style={[
              styles.error,
              item.error.length > 0 ? styles.showError : null,
            ]}>
            {'* ' + item.error}
          </Text>
        </Row>

        <Spacer value={12} />

        <View>
          <Row>
            <LabelledInput
              value={item.name}
              onChangeText={(text: string) => {
                onUpdateName(text);
              }}
              label={'Name'}
              inputError={!item.nameUnique ? errors.uniqueName : ''}
              onBlur={onValidateMachineName}
            />
          </Row>
          {!item.nameUnique ? (
            <Text style={[styles.error, styles.showError]}>
              {errors.uniqueName}
            </Text>
          ) : null}
        </View>

        <Spacer value={12} />

        {item.attributes.map((attribute, i) => (
          <View key={i}>
            <Spacer value={12} />

            <Row style={[styles.multiItemRow, styles.alignItemsCenter]}>
              <LabelledInput
                value={attribute.name}
                onChangeText={(text: string) => {
                  onUpdateAttributeName(attribute.id, text);
                }}
                label={'Attribute'}
                inputError={!attribute.nameUnique ? errors.uniqueName : ''}
                onBlur={() => {
                  onValidateAttributeName(attribute.id);
                }}
              />
              <SelectAttributeOption
                valueType={attribute.valueOption}
                onChangeValueType={(_, val: AttributeValueOptions) => {
                  onUpdateAttributeOption(attribute.id, val);
                }}
              />
              <DeleteAttribute
                onPress={() => {
                  onDeleteAttribute(attribute.id);
                }}
              />
            </Row>
            {!attribute.nameUnique ? (
              <Text style={[styles.error, styles.showError]}>
                {errors.uniqueName}
              </Text>
            ) : null}
          </View>
        ))}

        <Spacer value={12} />

        <Row>
          <SelectTitle
            options={titleOptions}
            title={parseTitleName(item.attributes, item.titleAttributeId)}
            onChangeTitle={onUpdateTitleAttribute}
          />
        </Row>

        <Spacer value={12} />

        <Row style={[styles.multiItemRow, styles.alignItemsCenter]}>
          <AddNewAttribute addNewAttribute={onCreateAttribute} />
          <DeleteMachine onPress={onDeleteCategory} />
        </Row>
      </Column>
    </ColCard>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: color('white'),
    padding: 20,
  },
  alignItemsCenter: {alignItems: 'center'},
  multiItemRow: {gap: 10, flexWrap: 'nowrap'},
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: color('black'),
  },
  error: {
    fontSize: 10,
    color: color('red'),
    opacity: 0,
  },
  showError: {
    opacity: 1,
  },
});

export default MachineCategory;
