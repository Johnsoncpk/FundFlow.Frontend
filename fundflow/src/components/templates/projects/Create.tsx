import { Box } from "@chakra-ui/layout";
import { Button, Flex, Heading } from "@chakra-ui/react";
import { Step, Steps, useSteps } from "chakra-ui-steps";
import { Form1, Form2, Form3, Form4 } from "./StepForms";
import { useForm } from "react-hook-form";

const steps = [
  {
    label: "Project Information",
    form: Form1,
  },
  {
    label: "Project Setting",
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

type ProjectData = {
  name: string
  description: string
  category: string
}

export const Create = ({
  variant,
}: {
  variant: "circles" | "circles-alt" | "simple" | undefined;
}) => {
  const { nextStep, prevStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });
  const isLastStep = activeStep === steps.length - 1;
  const hasCompletedAllSteps = activeStep === steps.length;

  const {
    handleSubmit,
    trigger,
    register,
    formState: { isSubmitting, errors },
  } = useForm<ProjectData>();

  return (
    <Flex flexDir="column" width="100%">
      <form onSubmit={(e) => {
        e.preventDefault();
        nextStep();
      }}>
        <Steps variant={variant} colorScheme="blue" activeStep={activeStep}>
          {steps.map(({ label, form }, index) => (
            <Step label={label} key={label + index}>
              <Box sx={{ p: 8, my: 8, rounded: "md" }}>
                {form(register, errors)}
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
              <Button size="sm" onClick={(event) => { event.target.form.requestSubmit(); }} colorScheme='blue' isLoading={isSubmitting}>
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