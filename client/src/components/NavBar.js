import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import Logout from './Logout';
import { inMemoryUserManager } from '../util/fetcher';
import { Link, Navigate} from 'react-router-dom';
import Login from './Login';
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  let navigate = useNavigate();
  let user = inMemoryUserManager.getUser();
  if (user == null) {
    navigate("/");
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Plex Hours
          </Typography>
           <Logout/>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
