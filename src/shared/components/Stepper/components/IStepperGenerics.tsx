import { Box, Button, Step, StepLabel, Stepper, Typography } from '@mui/material';
import React from 'react';
import { IStepperGeneric } from '../../../interfaces/Steps/IStepperGeneric';

interface IStepperGenericProps {
  steps: IStepperGeneric[];
  sucess?: React.ReactNode;
}

const StepperGeneric: React.FC<IStepperGenericProps> = ({ steps, sucess }) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skippeds, setSkippeds] = React.useState(new Set<number>());

  const isStepOptional = (step: IStepperGeneric) => {
    return step.isSkipped;
  };

  const isStepSkipped = (step: number) => {
    return skippeds.has(step);
  };

  const isStepLast = () => {
    return activeStep === steps.length - 1;
  };

  const positionContainsInArray = () => {
    return activeStep < steps.length;
  };

  const handleNext = () => {
    let newSkipped = skippeds;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkippeds(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (positionContainsInArray() && !isStepOptional(steps[activeStep])) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkippeds((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((step, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          if (isStepOptional(steps[index])) {
            labelProps.optional = <Typography variant="caption">Opcional</Typography>;
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={step.name} {...stepProps}>
              <StepLabel {...labelProps}>{step.name}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <>
          {sucess || <Typography sx={{ mt: 2, mb: 1 }}>All steps completed - you&apos;re finished</Typography>}
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </>
      ) : (
        <>
          <Typography sx={{ mt: 2, mb: 1 }}>{steps[activeStep].component}</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            {positionContainsInArray() && isStepOptional(steps[activeStep]) && !isStepLast() && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}
            <Button onClick={handleNext}>{activeStep === steps.length - 1 ? 'Finish' : 'Next'}</Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default StepperGeneric;
