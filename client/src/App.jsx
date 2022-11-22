import { EthProvider } from "./contexts/EthContext";

import "./App.css";
import MainContainer from "./components/MainContainer/MainContainer"


function App() {
  return (
    <EthProvider>
      <div id="App" >
        <MainContainer />
      </div>
    </EthProvider>
  );
}

export default App;
