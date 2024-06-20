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
import { AUTH_KEY, ORGANIZACAO, ID_TEAMS_FORCE } from '../constants/Environment';

const AppBarHeader = () => {
  const [openSettings, setOpenSettings] = useState(false);
  const [organization, setOrganization] = useState(ORGANIZACAO);
  const [authKey, setAuthKey] = useState(AUTH_KEY);
  const [idTeamForce, setIdTeamForce] = useState(ID_TEAMS_FORCE);

  const handleToogleModal = () => {
    setOpenSettings((prev) => !prev);
  };

  const handleRemoveInfo = () => {
    setOrganization('');
    setAuthKey('');
    setIdTeamForce('');
  };

  const handleSetOrganization = (value: string) => {
    setOrganization(value);
  };

  const handleSetAuthKey = (value: string) => {
    setAuthKey(value);
  };

  const handleSetIdTeamForce = (value: string) => {
    setIdTeamForce(value);
  };

  const handleSubmit = () => {
    window.localStorage.setItem('organization', organization);
    window.localStorage.setItem('authKey', authKey);
    window.localStorage.setItem('idTeamForce', idTeamForce);
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
            <TextField label="IdTeam" value={idTeamForce} onChange={(e) => handleSetIdTeamForce(e.target.value)} />
          </Grid>
          <Grid container p={2} gap={2} justifyContent="space-between">
            <Grid justifyContent="space-between">
              <Button variant="outlined" sx={{ marginRight: 2 }} onClick={handleToogleModal}>
                Cancelar
              </Button>
              <Button sx={{ color: 'red' }} onClick={handleRemoveInfo}>
                Apagar
              </Button>
            </Grid>

            <Box>
              <Button variant="contained" onClick={handleSubmit}>
                Confirmar
              </Button>
            </Box>
          </Grid>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default AppBarHeader;
