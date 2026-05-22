// import './App.css'
import { ClockProvider } from "./context/ClockContext";

function App() {

  return (
    <>
      <ClockProvider>
        <div className="app-container">
          {/* wrap other components in clock provider */}
        </div>
      </ClockProvider>
    </>
  )
}

export default App;
