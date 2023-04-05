import createMachine, {CreateMachineA} from './createMachine';
import createMachineAttribute, {
  CreateMachineAttributeA,
} from './createMachineAttribute';
import createMachineCategory, {
  CreateMachineCategoryA,
} from './createMachineCategory';
import deleteMachine, {DeleteMachineA} from './deleteMachine';
import deleteMachineAttribute, {
  DeleteMachineAttributeA,
} from './deleteMachineAttribute';
import deleteMachineCategory, {
  DeleteMachineCategoryA,
} from './deleteMachineCategory';
import updateAttributeValue, {
  UpdateAttributeValueA,
} from './updateAttributeValue';
import updateAttributeValueOption, {
  UpdateAttributeValueOptionA,
} from './updateAttributeValueOption';
import updateMachineAttributeName, {
  UpdateMachineAttributeNameA,
} from './updateMachineAttributeName';
import updateMachineCategoryName, {
  UpdateMachineCategoryNameA,
} from './updateMachineCategoryName';
import updateMachineTitleAttribute, {
  UpdateMachineTitleAttributeA,
} from './updateMachineTitleAttribute';
import validateMachineAttributeName, {
  ValidateMachineAttributeNameA,
} from './validateMachineAttributeName';
import validateMachineCategoryName, {
  ValidateMachineCategoryNameA,
} from './validateMachineCategoryName';

export type Action =
  | CreateMachineAttributeA
  | CreateMachineCategoryA
  | DeleteMachineAttributeA
  | DeleteMachineA
  | DeleteMachineCategoryA
  | UpdateAttributeValueA
  | UpdateAttributeValueOptionA
  | UpdateMachineAttributeNameA
  | UpdateMachineCategoryNameA
  | UpdateMachineTitleAttributeA
  | ValidateMachineAttributeNameA
  | ValidateMachineCategoryNameA
  | CreateMachineA;

export default {
  createMachine,
  createMachineAttribute,
  createMachineCategory,
  deleteMachine,
  deleteMachineAttribute,
  deleteMachineCategory,
  updateAttributeValue,
  updateAttributeValueOption,
  updateMachineAttributeName,
  updateMachineCategoryName,
  updateMachineTitleAttribute,
  validateMachineAttributeName,
  validateMachineCategoryName,
};
