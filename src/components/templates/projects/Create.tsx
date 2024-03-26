import React, { useState } from 'react';
import { Box } from "@chakra-ui/layout";
import { Alert, AlertDescription, AlertIcon, AlertTitle, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { Step, Steps, useSteps } from "chakra-ui-steps";
import { Form1, Form2, Form3, Form4 } from "./StepForms";
import { ProjectData } from 'components/types';
import { INIT_VALUE } from './StepForms/DefaultWYSIWYGValue';

const steps = [
  {
    label: "Basic Information",
    form: Form1,
  },
  {
    label: "Round Setting",
    form: Form2
  },
  {
    label: "Project Details",
    form: Form3
  },
  {
    label: "Final Review",
    form: Form4
  }
];

export const Create = ({
  variant,
}: {
  variant: "circles" | "circles-alt" | "simple" | undefined;
}) => {
  const { nextStep, prevStep, reset, setStep, activeStep } = useSteps({
    initialStep: 0,
  });
  const isLastStep = activeStep === steps.length - 1;
  const hasCompletedAllSteps = activeStep === steps.length;

  const [projectData, setProjectData] = useState<ProjectData>(INIT_VALUE);



  return (
    <Flex flexDir="column" width="100%">
      <Text align={'center'} fontSize='3xl' marginBottom={'30px'}>🎨 Create Your Project 🛠️</Text>
      <form onSubmit={(e) => {
        e.preventDefault();
      }}>
        <Steps variant={variant} colorScheme="blue" activeStep={activeStep}>
          {steps.map(({ label, form }, index) => (
            <Step label={<Text onClick={() => { setStep(index) }}>{label}</Text>} key={label + index}>
              <Box sx={{ p: 8, my: 8, rounded: "md" }}>
                {form({ projectData, setProjectData })}
              </Box>
            </Step>
          ))}
        </Steps>
        {hasCompletedAllSteps && (
          <div>
            <Box sx={{ my: 8, p: 8, rounded: "md" }}>
              <Alert
                status='success'
                variant='top-accent'
                flexDirection='column'
                alignItems='center'
                justifyContent='center'
                textAlign='center'
                height='200px'
              >
                <AlertIcon boxSize='40px' mr={0} />
                <AlertTitle mt={4} mb={1} fontSize='lg'>
                  🍾Create Project Request Submmited!🥂
                </AlertTitle>
                <AlertDescription maxWidth='sm'>
                  Project creation may take some times. Please wait for 5-10 mins!
                </AlertDescription>
              </Alert>
            </Box>
            <Flex width="100%" justify="center" gap={4}>
              <Button onClick={reset}>
                Back to home page
              </Button>
            </Flex>
          </div>
        )}
        {!hasCompletedAllSteps && (
          <Flex width="100%" justify="flex-end" gap={4}>
            <Button
              isDisabled={activeStep === 0}
              onClick={prevStep}
              size="sm"
              variant="ghost"
            >
              Prev
            </Button>
            {isLastStep ?
              <Button size="sm" onClick={
                (event: React.MouseEvent<HTMLButtonElement>) => {
                  const form = event.currentTarget.form as HTMLFormElement;
                  nextStep();
                  form.requestSubmit();
                }} colorScheme='blue'>
                Finish
              </Button> :
              <Button size="sm" onClick={() => { nextStep(); }}>
                Next
              </Button>
            }
          </Flex>
        )}
      </form>
    </Flex>
  );
};