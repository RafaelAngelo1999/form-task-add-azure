import React from 'react';
import { Button, Grid } from '@mui/material';

const ButtonFormUser: React.FC = () => {
  return (
    <Grid container justifyContent="flex-end">
      <Grid item xs={12} sm={4} md={3} mt={2}>
        <Button type="submit" variant="contained" color="secondary" fullWidth sx={{ height: '55px' }}>
          Criar tasks default
        </Button>
      </Grid>
    </Grid>
  );
};

export default ButtonFormUser;
