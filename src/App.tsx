import React from 'react';
import { Provider } from 'react-redux';
import { Container } from '@mui/material';
import AppBarHeader from './shared/components/AppBarHeader';
import { store } from './store';
import { Cadastro } from './pages/Cadastro';

const App = () => {
  return (
    <Provider store={store}>
      <AppBarHeader />
      <Container>
        <Cadastro />
      </Container>
    </Provider>
  );
};

export default App;
