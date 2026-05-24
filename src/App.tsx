// import './App.css'
import { ClockProvider } from "./context/ClockContext";
import DigitalDisplay from "./components/DigitalDisplay";
import Sequencer from "./components/Sequencer";

function App() {

  return (
    <>
      <ClockProvider>
        <div className="app-container">
          <DigitalDisplay />
          <Sequencer sequenceLength={15}/>
        </div>
      </ClockProvider>
    </>
  )
}

export default App;
