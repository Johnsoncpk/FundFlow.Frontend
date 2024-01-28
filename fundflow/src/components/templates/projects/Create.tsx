import { useColorModeValue } from "@chakra-ui/color-mode";
import { Box } from "@chakra-ui/layout";
import { Button, Flex, FormControl, FormErrorMessage, FormLabel, Heading, Input } from "@chakra-ui/react";
import { Step, Steps, useSteps } from "chakra-ui-steps";
import { Form1, Form2, Form3 } from "./StepForms";
import { Field, Form, Formik, FormikProps } from 'formik';
import { useState } from "react";

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
  const bg = useColorModeValue("gray.200", "gray.700");

  function validateName(value: string) {
    let error
    if (!value) {
      error = 'Name is required'
    } else if (value.toLowerCase() !== 'naruto') {
      error = "Jeez! You're not a fan 😱"
    }
    return error
  }

  return (
    <Flex flexDir="column" width="100%">
      <Formik
        initialValues={{ name: 'Naruto' }}
        onSubmit={(values, actions) => {
          alert(JSON.stringify(values, null, 2))
          actions.setSubmitting(false)
          reset();
        }}>
        {(props) => (
          <Form>
            <Field name='name' validate={validateName}>
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.name && form.touched.name}>
                  <FormLabel>First name</FormLabel>
                  <Input {...field} placeholder='name' />
                  <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Steps variant={variant} colorScheme="blue" activeStep={activeStep}>
              {steps.map(({ label, form }, index) => (
                <Step label={label} key={label}>
                  <Box sx={{ p: 8, bg, my: 8, rounded: "md" }}>
                    {form()}
                  </Box>
                </Step>
              ))}
            </Steps>
            {hasCompletedAllSteps && (
              <Box sx={{ bg, my: 8, p: 8, rounded: "md" }}>
                <Heading fontSize="xl" textAlign={"center"}>
                  Woohoo! All steps completed! 🎉
                </Heading>
              </Box>
            )}
            <Flex width="100%" justify="flex-end" gap={4}>
              {hasCompletedAllSteps ? (
                <Flex>
                  <Button
                    size="sm" onClick={reset}>
                    Reset
                  </Button>
                  <Button
                    size="sm"
                    colorScheme='teal'
                    isLoading={props.isSubmitting}
                    type='submit'
                  >
                    Submit
                  </Button>
                </Flex>
              ) : (
                <>
                  <Button
                    isDisabled={activeStep === 0}
                    onClick={prevStep}
                    size="sm"
                    variant="ghost"
                  >
                    Prev
                  </Button>
                  {isLastStep ?
                    <Button size="sm" colorScheme='teal' onClick={() => { props.handleSubmit }} isLoading={props.isSubmitting}>
                      Finish
                    </Button> :
                    <Button size="sm" onClick={nextStep}>
                      Next
                    </Button>
                  }
                </>
              )}
            </Flex>
          </Form>
        )}
      </Formik>
    </Flex>
  );
};