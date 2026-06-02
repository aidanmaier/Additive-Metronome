// import './App.css'
import { useState, useEffect } from 'react';
import { ClockProvider } from "./context/ClockContext";
import { SoundProvider } from './context/SoundContext';
import { useClock } from "./hooks/useClock";
import { Grid } from "@mui/material";
import MenuAppBar from "./components/MenuAppBar";
import OutputControl from "./components/OutputControl";
import PatternControl from "./components/PatternControl";
import TempoControl from "./components/TempoControl";

const indicatorColors = ["magenta"]; // colors corresponding to different click sounds

const AppContent = () => {
  const { time, playState, flashState } = useClock();
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    if (!flashState || !playState) {return};
    setFlash(true);
    const timeout = window.setTimeout(() => setFlash(false), 120);
    return () => window.clearTimeout(timeout);
  }, [time, flashState]);

  return (
    <div
      className="app-container"
      style={{
        flexGrow: 1,
        backgroundColor: flash ? indicatorColors[0] : "transparent",
        transition: "background-color 120ms ease",
      }}
    >
      <MenuAppBar />
      <Grid
        container
        rowSpacing={2}
        columnSpacing={4}
        sx={{ m: 2 }}
      >
        <Grid>
          <OutputControl />
        </Grid>
        <Grid>
          <PatternControl />
        </Grid>
      </Grid>
      <TempoControl />
    </div>
  );
};

export default function App() {
  return (
    <ClockProvider>
      <SoundProvider>
        <AppContent />
      </SoundProvider>
    </ClockProvider>
  );
}
