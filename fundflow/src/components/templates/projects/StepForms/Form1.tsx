import { Flex, FormControl, FormErrorMessage, FormLabel, Input } from "@chakra-ui/react";
import { Field } from 'formik';

export const Form1 = () => {
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
        {({ field, form }) => (
          <FormControl isInvalid={form.errors.name && form.touched.name}>
            <FormLabel>First name</FormLabel>
            <Input {...field} placeholder='name' />
            <FormErrorMessage>{form.errors.name}</FormErrorMessage>
          </FormControl>
        )}
      </Field>
      <Field name='projectDescription' validate={validateName}>
        {({ field, form }) => (
          <FormControl isInvalid={form.errors.name && form.touched.name}>
            <FormLabel>First name</FormLabel>
            <Input {...field} placeholder='name' />
            <FormErrorMessage>{form.errors.name}</FormErrorMessage>
          </FormControl>
        )}
      </Field>
    </Flex>
  );
};