import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Step, StepLabel, Stepper, Typography } from '@mui/material';
import UserInformation from '../components/UserInformation';
import { State } from '../../../store';
import FinishFormUser from '../components/FinishFormUser';
import { AUTH_KEY, ORGANIZACAO } from '../../../shared/constants/Environment';

const Cadastro = () => {
  const activeStepUser = useSelector((state: State) => state.activeSteps.user);
  const steps = ['Information'];

  return (
    <>
      {activeStepUser === 0 || activeStepUser < 1 ? (
        <Box boxShadow={2} my={10} p={6}>
          {(!ORGANIZACAO || !AUTH_KEY) && (
            <Typography color="red" fontWeight={700}>
              Clique no icone de configuração e defina as variáveis!
            </Typography>
          )}
          <Stepper activeStep={activeStepUser} style={{ marginBottom: '36px' }}>
            {steps.map((step) => {
              const stepProps: { completed?: boolean } = {};
              const labelProps: {
                optional?: React.ReactNode;
              } = {};
              return (
                <Step key={step} {...stepProps}>
                  <StepLabel {...labelProps}>{step}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          {activeStepUser === 0 && <UserInformation />}
        </Box>
      ) : (
        <FinishFormUser />
      )}
    </>
  );
};

export default Cadastro;
