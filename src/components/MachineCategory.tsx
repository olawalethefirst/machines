import ColCard from './ColCard';
import Column from './layout/Column';
import Row from './layout/Row';
import Input from './Input';
import Spacer from './layout/Spacer';
import DeleteAttribute from './DeleteAttribute';
import DeleteMachine from './DeleteMachine';
import {StyleSheet} from 'react-native';
import color from '../utils/color';
import {
  MachineCategory as MachineCategoryType,
  AttributeValueOptions,
  MachineCategoryAttribute,
} from '../types';
import {FC, useEffect, useMemo, memo, Dispatch} from 'react';
import {Text, View} from 'react-native';
import updateAttributeName from '../context/actions/updateAttributeName';
import updateAttributeValueOption from '../context/actions/updateAttributeValueOption';
import createMachineAttribute from '../context/actions/createMachineAttribute';
import deleteMachineCategory from '../context/actions/deleteMachineCategory';
import deleteMachineAttribute from '../context/actions/deleteMachineAttribute';
import clearCategoryError from '../context/actions/clearCategoryError';
import {errors, attributeValueOptions} from '../constants';
import updateMachineCategoryName from '../context/actions/updateMachineCategoryName';
import updateMachineTitleAttribute from '../context/actions/updateMachineTitleAttribute';
import getCategoryName from '../utils/getCategoryName';
import Dropdown from './Dropdown';
import {buttonStyles} from './Button';
import validateMachineCategoryName from '../context/actions/validateMachineCategoryName';
import validateAttributeName from '../context/actions/validateMachineAttributeName';
import {Action} from '../context/actions';

interface Props {
  item: MachineCategoryType;
  dispatch: Dispatch<Action>;
}

const SelectAttributeIcon: React.FC<{
  valueType?: AttributeValueOptions;
}> = ({valueType}) => {
  return <Text style={styles.dropdownText}>{valueType}</Text>;
};
const AddAttributeIcon: React.FC = () => (
  <Text style={styles.addText}>add new field</Text>
);
const SelectTitleText: React.FC<{title?: string}> = ({title}) => (
  <Text numberOfLines={1} style={styles.selectTitleText}>
    {'Attribute title:     '}
    <Text style={styles.selectTitleValueText}>{title}</Text>
  </Text>
);

const unNamedAttributePrefix = 'Unnamed Attribute - ';
const getAttributeTitle = (attribute: MachineCategoryAttribute) =>
  attribute.name.length > 0
    ? attribute.name
    : unNamedAttributePrefix + attribute.id;

const MachineCategory: FC<Props> = function ({item, dispatch}) {
  const categoryName = getCategoryName(item);
  const titleOptions = useMemo(() => {
    const attributes = item.attributes;
    const textAttributes = [];
    for (let i in attributes) {
      if (attributes[i].valueOption === 'text') {
        textAttributes.push(attributes[i]);
      }
    }

    return textAttributes;
  }, [item.attributes]);
  const categoryTitle = useMemo(() => {
    const titleAttribute = item.attributes[item.titleAttributeId];

    return titleAttribute.name.length > 0
      ? titleAttribute.name
      : unNamedAttributePrefix + titleAttribute.id;
  }, [item.attributes, item.titleAttributeId]);

  useEffect(() => {
    if (item.error.length > 0) {
      setTimeout(() => {
        clearCategoryError(dispatch)(item.id);
      }, 5000);
    }
  }, [item.error, dispatch, item.id]);

  return (
    <ColCard>
      <Column style={styles.container}>
        <Row>
          <Text style={styles.title}>{categoryName}</Text>
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
            <Input
              value={item.name}
              onValueUpdate={value =>
                updateMachineCategoryName(dispatch)(item.id, value)
              }
              label={'Name'}
              inputError={!item.nameUnique}
              onBlurInput={() => validateMachineCategoryName(dispatch)(item.id)}
            />
          </Row>
          {!item.nameUnique ? (
            <Text style={[styles.error, styles.showError]}>
              {errors.uniqueName}
            </Text>
          ) : null}
        </View>

        <Spacer value={12} />

        {Object.values(item.attributes).map(attribute => (
          <View key={attribute.id}>
            <Spacer value={12} />

            <Row style={[styles.multiItemRow, styles.alignItemsCenter]}>
              <Input
                value={attribute.name}
                onValueUpdate={name => {
                  updateAttributeName(dispatch)(attribute.id, item.id, name);
                }}
                label={'Attribute'}
                inputError={!attribute.nameUnique}
                onBlurInput={() =>
                  validateAttributeName(dispatch)(attribute.id, item.id)
                }
              />
              <Dropdown
                options={[...attributeValueOptions]}
                onSelectOption={(_, val: string) => {
                  updateAttributeValueOption(dispatch)(
                    attribute.id,
                    item.id,
                    val as AttributeValueOptions,
                  );
                }}
                defaultOption={attribute.valueOption}
                renderButtonProps={{
                  touchableProps: {
                    style: [styles.dropdownButton, buttonStyles.button],
                  },
                  renderChildren: SelectAttributeIcon,
                  childrenProps: {valueType: attribute.valueOption},
                }}
              />
              <DeleteAttribute
                onPress={() => {
                  deleteMachineAttribute(dispatch)(attribute.id, item.id);
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
          <Dropdown
            containerStyle={styles.selectTitleDropdownContainer}
            dropdownStyle={styles.selectTitleDropdown}
            options={titleOptions.map(option => getAttributeTitle(option))}
            onSelectOption={index =>
              updateMachineTitleAttribute(dispatch)(
                item.id,
                titleOptions[parseInt(index, 10)].id,
              )
            }
            defaultOption={getAttributeTitle(
              item.attributes[item.titleAttributeId],
            )}
            renderButtonProps={{
              touchableProps: {
                style: [buttonStyles.button, styles.selectTitleButton],
              },
              renderChildren: SelectTitleText,
              childrenProps: {title: categoryTitle},
            }}
          />
        </Row>

        <Spacer value={12} />

        <Row style={[styles.multiItemRow, styles.alignItemsCenter]}>
          <Dropdown
            onSelectOption={(i, value) =>
              createMachineAttribute(dispatch)(
                item.id,
                value as AttributeValueOptions,
              )
            }
            renderButtonProps={{
              touchableProps: {style: [buttonStyles.button, styles.addButton]},
              renderChildren: AddAttributeIcon,
            }}
            options={[...attributeValueOptions]}
            defaultOption={attributeValueOptions[0]}
          />
          <DeleteMachine
            onPress={() => deleteMachineCategory(dispatch)(item.id)}
          />
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
  dropdownButton: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: color('lightPurple'),
  },
  dropdownText: {
    fontSize: 14,
    textTransform: 'uppercase',
    fontWeight: '500',
    color: color('darkPurple'),
  },
  addButton: {
    borderWidth: 1,
    borderColor: color('lightPurple'),
  },
  addText: {
    fontSize: 14,
    textTransform: 'uppercase',
    fontWeight: '500',
    color: color('darkPurple'),
  },
  selectTitleButton: {
    borderWidth: 1,
    borderColor: color('darkGrey'),
    backgroundColor: color('lightGrey'),
    alignItems: 'stretch',
  },
  selectTitleText: {
    fontSize: 14,
    fontWeight: '600',
    color: color('darkGrey'),
    textTransform: 'capitalize',
  },
  selectTitleValueText: {
    color: color('black'),
  },
  selectTitleDropdownContainer: {
    flexGrow: 1,
  },
  selectTitleDropdown: {
    minWidth: 300,
  },
});

export default memo(MachineCategory);
