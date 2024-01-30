import { Flex, FormControl, FormErrorMessage, FormLabel, Input } from "@chakra-ui/react";
import { useFormikContext, Field } from 'formik';

export const Form1 = () => {
  const { values, handleChange, errors, touched } = useFormikContext();

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
      <Field name='projectTitle' validate={validateName}>
        <FormControl isInvalid={errors.projectTitle && touched.projectTitle}>
          <FormLabel>Project Title</FormLabel>
          <Input value={values.projectTitle} onChange={handleChange} variant='flushed' placeholder='name' />
          <FormErrorMessage>{errors.projectTitle}</FormErrorMessage>
        </FormControl>
      </Field>
      <Field name='projectDescription' validate={validateName}>
        {({ field, form }) => (
          <FormControl isInvalid={form.errors.name && form.touched.name}>
            <FormLabel>Project Description</FormLabel>
            <Input variant='flushed' {...field} placeholder='name' />
            <FormErrorMessage>{form.errors.name}</FormErrorMessage>
          </FormControl>
        )}
      </Field>
    </Flex>
  );
};