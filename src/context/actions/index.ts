import createMachine, {CreateMachineA, CreateMachine} from './createMachine';
import createMachineAttribute, {
  CreateMachineAttributeA,
  CreateMachineAttribute,
} from './createMachineAttribute';
import createMachineCategory, {
  CreateMachineCategoryA,
  CreateMachineCategory,
} from './createMachineCategory';
import deleteMachine, {DeleteMachineA, DeleteMachine} from './deleteMachine';
import deleteMachineAttribute, {
  DeleteMachineAttributeA,
  DeleteMachineAttribute,
} from './deleteMachineAttribute';
import deleteMachineCategory, {
  DeleteMachineCategoryA,
  DeleteMachineCategory,
} from './deleteMachineCategory';
import updateAttributeValue, {
  UpdateAttributeValueA,
  UpdateAttributeValue,
} from './updateAttributeValue';
import updateAttributeValueOption, {
  UpdateAttributeValueOptionA,
  UpdateAttributeValueOption,
} from './updateAttributeValueOption';
import updateAttributeName, {
  UpdateAttributeNameA,
  UpdateAttributeName,
} from './updateAttributeName';
import updateMachineCategoryName, {
  UpdateMachineCategoryNameA,
  UpdateMachineCategoryName,
} from './updateMachineCategoryName';
import updateMachineTitleAttribute, {
  UpdateMachineTitleAttributeA,
  UpdateMachineTitleAttribute,
} from './updateMachineTitleAttribute';
import clearCategoryError, {
  ClearCategoryError,
  ClearCategoryErrorA,
} from './clearCategoryError';
import validateMachineCategoryName, {
  ValidateMachineCategoryName,
  ValidateMachineCategoryNameA,
} from './validateMachineCategoryName';
import validateAttributeName, {
  ValidateAttributeName,
  ValidateAttributeNameA,
} from './validateMachineAttributeName';

export type Action =
  | CreateMachineAttributeA
  | CreateMachineCategoryA
  | DeleteMachineAttributeA
  | DeleteMachineA
  | DeleteMachineCategoryA
  | UpdateAttributeValueA
  | UpdateAttributeValueOptionA
  | UpdateAttributeNameA
  | UpdateMachineCategoryNameA
  | UpdateMachineTitleAttributeA
  | CreateMachineA
  | ClearCategoryErrorA
  | ValidateMachineCategoryNameA
  | ValidateAttributeNameA;

export type Actions =
  | CreateMachineAttribute
  | CreateMachineCategory
  | DeleteMachineAttribute
  | DeleteMachine
  | DeleteMachineCategory
  | UpdateAttributeValue
  | UpdateAttributeValueOption
  | UpdateAttributeName
  | UpdateMachineCategoryName
  | UpdateMachineTitleAttribute
  | CreateMachine
  | ClearCategoryError
  | ValidateMachineCategoryName
  | ValidateAttributeName;

const actions = {
  createMachine,
  createMachineAttribute,
  createMachineCategory,
  deleteMachine,
  deleteMachineAttribute,
  deleteMachineCategory,
  updateAttributeValue,
  updateAttributeValueOption,
  updateAttributeName,
  updateMachineCategoryName,
  updateMachineTitleAttribute,
  clearCategoryError,
  validateMachineCategoryName,
  validateAttributeName,
};

const actionsValue = Object.values(actions);

export default actions as {
  [key: string]: (typeof actionsValue)[number];
};
