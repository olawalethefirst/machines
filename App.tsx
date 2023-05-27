import 'react-native-gesture-handler';
import {MachineProvider} from './src/context/MachinesContext';
import MachinesDrawer from './src/components/Navigator';
import {PaperProvider} from 'react-native-paper';

function App(): JSX.Element {
  return (
    <MachineProvider>
      <PaperProvider>
        <MachinesDrawer />
      </PaperProvider>
    </MachineProvider>
  );
}

export default App;
