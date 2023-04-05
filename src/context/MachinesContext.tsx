import {createContext} from 'react';
import {UseMachinesState} from './useMachines';
import {CreateMachine} from './actions/createMachine';
import {CreateMachineAttribute} from './actions/createMachineAttribute';
import {CreateMachineCategory} from './actions/createMachineCategory';
import {DeleteMachine} from './actions/deleteMachine';
import {DeleteMachineAttribute} from './actions/deleteMachineAttribute';
import {DeleteMachineCategory} from './actions/deleteMachineCategory';
import {UpdateAttributeValue} from './actions/updateAttributeValue';
import {UpdateAttributeValueOption} from './actions/updateAttributeValueOption';
import {UpdateMachineAttributeName} from './actions/updateMachineAttributeName';
import {UpdateMachineCategoryName} from './actions/updateMachineCategoryName';
import {UpdateMachineTitleAttribute} from './actions/updateMachineTitleAttribute';
import {ValidateMachineAttributeName} from './actions/validateMachineAttributeName';
import {ValidateMachineCategoryName} from './actions/validateMachineCategoryName';
import useMachines from './useMachines';

export interface MachinesContext {
  state: UseMachinesState;
  createMachine: CreateMachine;
  createMachineAttribute: CreateMachineAttribute;
  createMachineCategory: CreateMachineCategory;
  deleteMachine: DeleteMachine;
  deleteMachineAttribute: DeleteMachineAttribute;
  deleteMachineCategory: DeleteMachineCategory;
  updateAttributeValue: UpdateAttributeValue;
  updateAttributeValueOption: UpdateAttributeValueOption;
  updateMachineAttributeName: UpdateMachineAttributeName;
  updateMachineCategoryName: UpdateMachineCategoryName;
  updateMachineTitleAttribute: UpdateMachineTitleAttribute;
  validateMachineAttributeName: ValidateMachineAttributeName;
  validateMachineCategoryName: ValidateMachineCategoryName;
}
const MachineContext = createContext<MachinesContext | null>(null);

interface MachineProviderProps {
  children: React.ReactNode;
}

export function MachineProvider({children}: MachineProviderProps) {
  const context = useMachines();

  return (
    <MachineContext.Provider value={context}>
      {children}
    </MachineContext.Provider>
  );
}

export default MachineContext;
