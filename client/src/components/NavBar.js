import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import Logout from './Logout';
import { inMemoryUserManager } from '../util/fetcher';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

export default function NavBar() {
  let navigate = useNavigate();
  let location = useLocation();
  let user = inMemoryUserManager.getUser();

  React.useEffect(() => {
    if (user == null) {
      navigate("/", {state: {referrer: location.pathname}})
    }
  });

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <NavLink to="/dashboard" style={{ textDecoration: 'none', color:'inherit'}}>
              Plex Hours
            </NavLink>
          </Typography>
           <Logout/>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
