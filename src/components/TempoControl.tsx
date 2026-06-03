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

  return (
    <Box 
      className="tempo-container"
      sx={{ 
        flexGrow: 1,
        border: "1px solid lightgrey", 
        borderRadius: 2,
        m: 2,
        minWidth: 322,
        maxWidth: 618,
      }} 
    >
      <Grid 
        container 
        rowSpacing={1.5} 
        columnSpacing={2}
        sx={{ 
          m: 2, 
          alignItems: "top",
        }} 
      >
        <Grid >
          <Stack 
            direction={"row"}
            spacing={1.5}
            sx={{ 
              width: 280,
              alignItems: "center",
              justifyContent: "space-between"

            }} 
          >
            <Typography>
              Tempo (bpm)
            </Typography>
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
            direction={"column"}
            spacing={1.5}
            sx={{ 
              alignItems: "center",

            }} 
          >
            
            <Stack direction={"row"} spacing={1.5}>
              <Typography className="music-font" >
                {"\u266A"}
              </Typography>
              <NumberField
                value={bpm}
                onChange={(v: number) => setBpm(v)}
                min={20}
                max={240}
              />
            </Stack>
            
            <Button 
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
          </Stack>
        </Grid>
        <Grid >
          <Stack 
            direction={"column"}
            spacing={1.5} 
            sx={{
              flex: 1,
            }}
          >
            <Stack direction={"row"} spacing={2} >
              <Stack direction={"row"} >
                <Stack direction={"column"} >
                  <CropSquareRoundedIcon htmlColor="green" />
                  <Typography className="music-font" >
                    {"\u2669"}
                  </Typography>
                </Stack>
                <NumberDisplay 
                  id={"shortBeatDisplay"} 
                  value={Math.round(bpm / 2)}
                />  
              </Stack>
              <Stack direction={"row"} >
                <Stack direction={"column"} >
                  <ChangeHistoryRoundedIcon htmlColor="orangered" />
                  <Typography className="music-font" >
                    {"\u2669"}.
                  </Typography>
                </Stack>
                <NumberDisplay 
                  id={"longBeatDisplay"}
                  value={Math.round(bpm / 3)}
                />
              </Stack>
            </Stack>
            <Button 
              id='playButton'
              variant="contained" 
              aria-label="Start metronome" 
              color={playState? "secondary" : "primary"}
              sx={{ 
                // width: 160, 
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
          </Stack>
        </Grid>        
      </Grid>
    </Box>
  );
}