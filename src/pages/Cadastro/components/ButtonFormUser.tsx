import React from 'react';
import { Box, Button } from '@mui/material';

const ButtonFormUser: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 4 }}>
      <Box sx={{ flex: '1 1 auto' }} />
      <Button type="submit" variant="contained" color="secondary">
        Criar tasks default
      </Button>
    </Box>
  );
};

export default ButtonFormUser;
