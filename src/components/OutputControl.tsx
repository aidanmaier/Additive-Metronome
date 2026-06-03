import { useClock } from "../hooks/useClock";
import { useSound } from "../hooks/useSound";
import { Box, Grid, Stack, ButtonGroup, Typography, Slider } from "@mui/material";
import OutputButton from "./OutputButton";
import StepSequence from "./StepSequence";

export default function OutputControl() {
  const { flashState, setFlashState } = useClock();
  const { volume, setVolume, mute, setMute, fill, setFill } = useSound();

  const outputButtons = [
    { 
      text: "Mute", 
      ariaLabel: "Mute", 
      clickFunction: () => setMute(!mute),
      selected: mute
    },
    { 
      text: "Flash", 
      ariaLabel: "Visual click", 
      clickFunction: () => setFlashState(!flashState),
      selected: flashState
    },
    { 
      text: "Fill", 
      ariaLabel: "Hear subdivisions", 
      clickFunction: () => setFill(!fill),
      selected: fill
    },
  ];

  return (
    <Box
      className="component-container"
      sx={{
        flexGrow: 1,
        border: "1px solid lightgrey",
        borderRadius: 2,
        minWidth: 322,
        maxWidth: 386,
        height: "100%",
      }}
    >
      <Grid
        container
        rowSpacing={1.5}
        columnSpacing={4}
        sx={{ m: 2, alignItems: "center" }}
      >
        <Stack
          direction={"row"}
          spacing={4}
          sx={{ 
            flex: 1,
            height: 20, 
            alignItems: "center", 
            justifyContent: "space-between",
          }}
        >
          <Typography>Volume</Typography>
          <Slider
            size="small"
            min={0}
            max={100}
            value={volume}
            sx = {{
              opacity: mute? 0.5 : 1, // appear disabled when mute
              minWidth: 160,
              maxWidth: 260,
            }}
            onChange={(_e, v: number | number[]) => {
              const newValue = Array.isArray(v) ? v[0] : v;
              if (mute) setMute(false);
              setVolume(newValue);
            }}
            valueLabelDisplay="auto"
          />
        </Stack >
        <Stack direction={"row"} spacing={4} sx={{ width: "100%", alignItems: "flex-start" }}>
          <ButtonGroup 
            aria-label="Output 
            control buttons" 
            orientation="vertical" 
            sx={{ width: 60 }}
          >
            {outputButtons.map((button) => (
              <OutputButton
                key={button.text}
                text={button.text}
                ariaLabel={button.ariaLabel}
                selected={button.selected}
                onClick={button.clickFunction}
              />
            ))}
          </ButtonGroup>
          <StepSequence />
        </Stack>
      </Grid>
    </Box>
  );
}