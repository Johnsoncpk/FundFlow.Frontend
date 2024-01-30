import { useColorModeValue } from "@chakra-ui/color-mode";
import { Box } from "@chakra-ui/layout";
import { Button, Flex, Heading } from "@chakra-ui/react";
import { Step, Steps, useSteps } from "chakra-ui-steps";
import { Form1, Form2, Form3 } from "./StepForms";
import { Form, useFormik } from 'formik';

const steps = [
  {
    label: "Basic Information",
    form: Form1
  },
  {
    label: "Project Setting",
    form: Form2
  },
  {
    label: "Final Review",
    form: Form3
  }
];

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
  const bc = useColorModeValue("blackAlpha.400", "whiteAlpha.400");

  const formik = useFormik({
    initialValues: { projectTitle: '', projectDescription: '' },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      formik.setSubmitting(false);
      reset();
    }
  })

  return (
    <Flex flexDir="column" width="100%">
      <Form>
        <Steps variant={variant} colorScheme="blue" activeStep={activeStep}>
          {steps.map(({ label, form }, index) => (
            <Step label={label} key={label + index}>
              <Box borderWidth={'thin'} sx={{ borderColor: bc, p: 8, my: 8, rounded: "md" }}>
                {form()}
              </Box>
            </Step>
          ))}
        </Steps>
        {hasCompletedAllSteps && (
          <Box sx={{ my: 8, p: 8, rounded: "md" }}>
            <Heading fontSize="xl" textAlign={"center"}>
              Woohoo! Project Created!!! 🎉
            </Heading>
          </Box>
        )}
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
            <Button size="sm" colorScheme='teal' onClick={() => { formik.handleSubmit() }} isLoading={formik.isSubmitting}>
              Finish
            </Button> :
            <Button size="sm" onClick={nextStep}>
              Next
            </Button>
          }
        </Flex>
      </Form>
    </Flex>
  );
};