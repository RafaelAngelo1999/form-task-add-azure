import {
  AppBar,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import Settings from '@mui/icons-material/Settings';
import GitHubIcon from '@mui/icons-material/GitHub';
import React, { useState } from 'react';
import { AUTH_KEY, ORGANIZACAO } from '../constants/Environment';

const AppBarHeader = () => {
  const [openSettings, setOpenSettings] = useState(false);
  const [organization, setOrganization] = useState(ORGANIZACAO);
  const [authKey, setAuthKey] = useState(AUTH_KEY);

  const handleToogleModal = () => {
    setOpenSettings((prev) => !prev);
  };

  const handleSetOrganization = (value: string) => {
    setOrganization(value);
  };

  const handleSetAuthKey = (value: string) => {
    setAuthKey(value);
  };

  const handleSubmit = () => {
    window.localStorage.setItem('organization', organization);
    window.localStorage.setItem('authKey', authKey);
    window.location.reload();
  };

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <Settings onClick={handleToogleModal} />
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

      <Dialog open={openSettings} PaperProps={{ sx: { width: 600 } }}>
        <DialogTitle>Definir variáveis</DialogTitle>
        <DialogContent>
          <Grid container direction="column" p={2} gap={2}>
            <TextField
              label="Organização"
              value={organization}
              onChange={(e) => handleSetOrganization(e.target.value)}
            />
            <TextField label="AuthKey" value={authKey} onChange={(e) => handleSetAuthKey(e.target.value)} />
          </Grid>
          <Grid container p={2} gap={2} justifyContent="space-between">
            <Button onClick={handleToogleModal}>Cancelar</Button>
            <Button variant="contained" onClick={handleSubmit}>
              Confirmar
            </Button>
          </Grid>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default AppBarHeader;
