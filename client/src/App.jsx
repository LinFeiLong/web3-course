import { EthProvider } from "./contexts/EthContext";
import Demo from "./components/Demo";
import "./App.css";
import ResponsiveAppBar from './components/ResponsiveAppBar/ResponsiveAppBar'

function App() {
  return (
    <EthProvider>
      <div id="App" >
        <ResponsiveAppBar />
        <Demo />
      </div>
    </EthProvider>
  );
}

export default App;
