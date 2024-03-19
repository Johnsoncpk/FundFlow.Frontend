import React, { useState } from 'react';
import { Box } from "@chakra-ui/layout";
import { Button, Flex, Heading, Text } from "@chakra-ui/react";
import { Step, Steps, useSteps } from "chakra-ui-steps";
import { Form1, Form2, Form3, Form4 } from "./StepForms";
import { ProjectData } from './types';

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

  const [projectData, setProjectData] = useState<ProjectData>({
    name: "",
    description: "",
    category: "",
    url: "",
    totalFundingGoal: 0,
    totalRound: 0,
    rounds: [{
      fundingGoal: 0,
      endAt: 0,
    }]
  });

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
              <Heading fontSize="xl" textAlign={"center"}>
                Woohoo! Project Created!!! 🎉
              </Heading>
            </Box>
            <Flex width="100%" justify="center" gap={4}>
              <Button onClick={reset}>
                Check the project you just created!
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