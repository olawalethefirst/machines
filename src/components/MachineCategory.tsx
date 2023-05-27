import {StyleSheet} from 'react-native';
import color from '../utils/color';
import {
  MachineCategory as MachineCategoryType,
  AttributeValueOptions,
  MachineCategoryAttribute,
} from '../types';
import {FC, useEffect, useMemo, memo, Dispatch} from 'react';
import {View} from 'react-native';
import Row from './layout/Row';
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
import validateMachineCategoryName from '../context/actions/validateMachineCategoryName';
import validateAttributeName from '../context/actions/validateMachineAttributeName';
import {Action} from '../context/actions';

import {
  Button,
  ButtonProps,
  Card,
  Text,
  TextInput,
  HelperText,
  IconButton,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

const AttributeValueOptionDropdown = memo(Dropdown<AttributeValueOptions>);
const AttributeDropdown = memo(Dropdown<MachineCategoryAttribute>);
const attributeOptions = [...attributeValueOptions];

interface Props {
  item: MachineCategoryType;
  dispatch: Dispatch<Action>;
}

const unNamedAttributePrefix = 'Unnamed Attribute - ';
const getAttributeTitle = (attribute: MachineCategoryAttribute) =>
  attribute.name.length > 0
    ? attribute.name
    : unNamedAttributePrefix + attribute.id;

// NEW IMPLEMENTATION
const TextButton = ({onPress, icon, children, ...otherProps}: ButtonProps) => (
  <Button
    onPress={onPress}
    labelStyle={styles.buttonText}
    icon={icon}
    {...otherProps}>
    {children}
  </Button>
);
const renderSelectOption: FC<{
  onPress: () => void;
  valueOption: AttributeValueOptions;
}> = ({onPress, valueOption}) => (
  <TextButton onPress={onPress}>{valueOption}</TextButton>
);
const DeleteIcon = () => (
  <Icon name="delete" size={24} color={color('darkPurple')} />
);
const AttributeDropdownButton: FC<{onPress: () => void}> = ({onPress}) => (
  <TextInput
    label="Attribute Title:   "
    value={''}
    editable={false}
    onPressIn={onPress}
    mode="outlined"
  />
);
const NewAttributeButton: FC<{onPress: () => void}> = ({onPress}) => (
  <TextButton onPress={onPress}>new attribute</TextButton>
);

// COMPONENT
const MachineCategory: FC<Props> = function ({item, dispatch}) {
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

  useEffect(() => {
    if (item.error.length > 0) {
      setTimeout(() => {
        clearCategoryError(dispatch)(item.id);
      }, 5000);
    }
  }, [item.error, dispatch, item.id]);

  return (
    <Card style={[styles.cardContainer]} mode="elevated">
      <Text variant="titleMedium">{getCategoryName(item)}</Text>

      <HelperText type="error" visible={item.error.length > 0}>
        {'* ' + item.error}
      </HelperText>

      <TextInput
        mode="outlined"
        label="Name"
        value={item.name}
        onChangeText={value =>
          updateMachineCategoryName(dispatch)(item.id, value)
        }
        error={!item.nameUnique}
        onBlur={() => validateMachineCategoryName(dispatch)(item.id)}
        // style={styles.rowMargin}
      />
      <HelperText type="error" visible={!item.nameUnique}>
        {errors.uniqueName}
      </HelperText>

      {Object.values(item.attributes).map(attribute => (
        <View key={attribute.id}>
          <Row style={[styles.rowItems]}>
            <TextInput
              mode="outlined"
              label={'Attribute Name'}
              value={attribute.name}
              onChangeText={name => {
                updateAttributeName(dispatch)(attribute.id, item.id, name);
              }}
              error={!attribute.nameUnique}
              onBlur={() =>
                validateAttributeName(dispatch)(attribute.id, item.id)
              }
              style={[styles.textInputInRow]}
            />
            <AttributeValueOptionDropdown
              menuOptions={attributeOptions}
              onSelectOption={option => {
                updateAttributeValueOption(dispatch)(
                  attribute.id,
                  item.id,
                  option,
                );
              }}
              MenuButton={renderSelectOption}
              menuButtonProps={{
                valueOption: attribute.valueOption,
              }}
            />
            <IconButton
              onPress={() => {
                deleteMachineAttribute(dispatch)(attribute.id, item.id);
              }}
              icon={DeleteIcon}
            />
          </Row>

          {
            <HelperText
              // style={{margin: 0, padding: 0}}
              type="error"
              visible={!attribute.nameUnique}>
              {errors.uniqueName}
            </HelperText>
          }
        </View>
      ))}

      <AttributeDropdown
        menuOptions={titleOptions}
        onSelectOption={option =>
          updateMachineTitleAttribute(dispatch)(item.id, option.id)
        }
        MenuButton={AttributeDropdownButton}
        renderOptionText={option => getAttributeTitle(option)}
      />

      <Row style={[styles.rowItems, styles.rowMargin]}>
        <AttributeValueOptionDropdown
          menuOptions={attributeOptions}
          onSelectOption={option =>
            createMachineAttribute(dispatch)(item.id, option)
          }
          MenuButton={NewAttributeButton}
        />
        {/* <IconButton /> */}
        <TextButton
          icon={DeleteIcon}
          onPress={() => deleteMachineCategory(dispatch)(item.id)}>
          "delete"
        </TextButton>
      </Row>
    </Card>
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

  cardContainer: {
    padding: 12,
    margin: 12,
    marginBottom: 6,
  },
  rowMargin: {
    marginTop: 20,
  },
  textInputInRow: {
    flexGrow: 1,
  },
  rowItems: {
    alignItems: 'center',
    gap: 4,
  },
  buttonText: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
});

export default memo(MachineCategory);
