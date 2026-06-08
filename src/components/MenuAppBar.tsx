// import * as React from 'react';
import { AppBar, Box, Stack, Toolbar, Typography } from "@mui/material";
// import {Box, Stack} from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
import logo from '../assets/logo.png';
// import IconButton from '@mui/material/IconButton';
// import MenuItem from '@mui/material/MenuItem';
// import Menu from '@mui/material/Menu';
// import { QuestionMark, Settings } from '@mui/icons-material';

export default function MenuAppBar() {
  // const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  // const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
  //   setAnchorEl(event.currentTarget);
  // };
  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  return (
    <Box sx={{ flexGrow: 1, m: 0, p: 0 }}>
      <AppBar 
        position="static" 
        sx={{ width: "100%", m: 0, px: 1 }}
      >
        <Toolbar 
          sx={{ 
            alignItems: 'center', 
            justifyContent: "center" 
          }}
        >
          <Stack 
            direction={"row"}
            spacing={2}
          >
            <Box
              component="img"
              src={logo}
              alt="Additive Metronome logo"
              sx={{ height: 32 }}
            />
            <Typography 
              component="div" 
              sx={{ flexGrow: 1, fontSize: 22 }}
            >
              Additive Metronome
            </Typography>
          </Stack>
          {/* <div>
            <IconButton
              size="small"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              // onClick={}
              color="inherit"
            >
              <QuestionMark fontSize="small" />
            </IconButton >
            <IconButton
              size="small"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <Settings fontSize="small" />
            </IconButton >
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Settings A</MenuItem>
              <MenuItem onClick={handleClose}>Settings B</MenuItem>
            </Menu>
          </div> */}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
