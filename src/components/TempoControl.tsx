import {useState} from 'react';
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import NumberField from "./NumberField";
import NumberDisplay from "./NumberDisplay";
import TempoSlider from './TempoSlider';
import { useClock } from '../hooks/useClock';
import ChangeHistoryRoundedIcon from '@mui/icons-material/ChangeHistoryRounded';
import CropSquareRoundedIcon from '@mui/icons-material/CropSquareRounded';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import StopRoundedIcon from '@mui/icons-material/StopRounded';

export default function TempoControl() {
  // const [playState, setPlayState] = useState(false); // playButton state
  const [tapTimes, setTapTimes] = useState<number[]>([]);
  const { bpm, setBpm, playState, setPlayState } = useClock();

  const handleTapTempo = () => {
    const now = Date.now();
    let newTapTimes = [...tapTimes];

    // If more than 2 seconds since last tap, reset (new tap session)
    if (newTapTimes.length > 0 && now - newTapTimes[newTapTimes.length - 1] > 2000) {
      newTapTimes = [];
    }

    newTapTimes.push(now);

    // Keep only the last 4 taps
    if (newTapTimes.length > 4) {
      newTapTimes = newTapTimes.slice(-4);
    }

    setTapTimes(newTapTimes);

    // Calculate BPM if we have at least 2 taps
    if (newTapTimes.length >= 2) {
      const intervals: number[] = [];
      for (let i = 1; i < newTapTimes.length; i++) {
        intervals.push(newTapTimes[i] - newTapTimes[i - 1]);
      }
      const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
      const newBpm = Math.round(60000 / avgInterval);
      
      // Clamp to valid range (20-240)
      const clampedBpm = Math.max(20, Math.min(240, newBpm));
      setBpm(clampedBpm);
    }
  };

  const playButton = (
    <Button 
      id="playButton"
      variant="contained" 
      aria-label="Start metronome" 
      color={playState? "secondary" : "primary"}
      sx={{ 
        width: "100%",
        height: 50 
      }}
      onClick={() => setPlayState(!playState)} // binary state
    >
      {playState ? 
        <StopRoundedIcon fontSize="large" /> :
        <PlayArrowRoundedIcon fontSize="large" />
      }
    </Button>
  );
  
  const tapButton = (
    <Button 
      id="tapButton"
      variant="outlined" 
      aria-label="Tap tempo" 
      sx={{ 
        width: 100, 
        height: 50, 
        boxShadow: 1,
        fontSize: "large",
      }}
      onClick={handleTapTempo}
    >
      TAP
    </Button>
  );

    const displayShort = (
    <Stack direction={"row"} >
      <Stack direction={"column"} >
        <CropSquareRoundedIcon htmlColor="green" fontSize="small" />
        <Typography className="music-font" >
          {"\u2669"}
        </Typography>
      </Stack>
      <NumberDisplay 
        id={"shortBeatDisplay"} 
        value={Math.round(bpm / 2)}
      />  
    </Stack>
  );

  const displayLong = (
    <Stack direction={"row"} >
      <Stack direction={"column"} >
        <ChangeHistoryRoundedIcon htmlColor="orangered" fontSize="small" />
        <Typography className="music-font" >
          {"\u2669"}.
        </Typography>
      </Stack>
      <NumberDisplay 
        id={"longBeatDisplay"}
        value={Math.round(bpm / 3)}
      />
    </Stack>
  );

  return (
    <Box 
      className="tempoControl-container"
      sx={{
        border: "1px solid lightgrey", 
        borderRadius: 2,
        minWidth: 322,
      }} 
    >
      <Grid 
        container 
        rowSpacing={0.5} 
        columnSpacing={4}
        sx={{ 
          m: 2, 
          alignItems: "center",
          justifyContent: "center",
        }} 
      >
        <Grid >
          <Stack id="tempoSlider-container"
            direction={"row"}
            spacing={3}
            sx={{ 
              alignItems: "center",
              justifyContent: "space-between"
            }} 
          >
            <Typography> Tempo (bpm) </Typography>
            <TempoSlider 
              min={60}
              max={280}
              value={bpm}
              onChange={(v: number) => setBpm(v)}
            />
          </Stack>
        </Grid>
        <Grid >
          <Stack 
            direction={"row"} 
            spacing={3}
            sx={{
              alignItems: "center"
            }}
          >
            <Stack id="tempoTap-container"
              direction={"column"}
              spacing={1.5}
            >
              <Stack 
                direction={"row"} 
                spacing={1}
              >
                <Typography className="music-font" sx={{alignContent:"end"}}>
                  {"\u266A"}
                </Typography>
                <NumberField
                  value={bpm}
                  onChange={(v: number) => setBpm(v)}
                  min={20}
                  max={240}
                />
              </Stack>
              {tapButton}
            </Stack>
            <Stack id="tempoPlay-container"
              direction={"column"}
              spacing={1.5}
            >
              <Stack direction={"row"} spacing={2} >
                {displayShort}
                {displayLong}
              </Stack>
              {playButton}
            </Stack>
          </Stack>
        </Grid>        
      </Grid>
    </Box>
  );
}