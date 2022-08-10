import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import GitHubIcon from '@mui/icons-material/GitHub';
import React from 'react';

const AppBarHeader = () => {
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon onClick={() => window.location.reload()} />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Criar Task AzureDevOps
          </Typography>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="git"
            sx={{ mr: 2 }}
            href="https://github.com/RafaelAngelo1999/"
            target="_blank"
          >
            <GitHubIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default AppBarHeader;
