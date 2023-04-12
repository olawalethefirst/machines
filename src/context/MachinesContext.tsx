import {createContext} from 'react';
import {Context} from './useMachines';
import useMachines from './useMachines';

const MachineContext = createContext<Context | null>(null);

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
