import 'react-native-gesture-handler';
import {MachineProvider} from './src/context/MachinesContext';
import MachinesDrawer from './src/components/Navigator';

function App(): JSX.Element {
  return (
    <MachineProvider>
      <MachinesDrawer />
    </MachineProvider>
  );
}

export default App;
