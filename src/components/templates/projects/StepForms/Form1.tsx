import { Flex, FormControl, FormErrorMessage, FormLabel, Input, Select, Textarea } from "@chakra-ui/react";

export const Form1 = (register: any, errors: any) => {

  return (
    <Flex flexDir="column" width="100%" gap={4}>
      <FormControl>
        <FormLabel htmlFor='name'>First name</FormLabel>
        <Input
          required
          id='name'
          placeholder='Stepping Stones'
          {...register('name', {
            required: 'This is required',
            minLength: { value: 4, message: 'Minimum length should be 4' },
          })}
        />
        <FormErrorMessage>
          {errors.name && <span>This field is required</span>}
        </FormErrorMessage>
      </FormControl>

      <FormControl>
        <FormLabel htmlFor='description'>Description</FormLabel>
        <Textarea
          required
          id='description'
          placeholder='Recalibrate with Acupoints designed by Oriental Acupuncture methodology. Apex cushioning, energy return, arch support, sustainable!'
          {...register('description', {
            required: 'This is required',
            minLength: { value: 4, message: 'Minimum length should be 4' },
          })}
        />
        <FormErrorMessage>
          {errors.description && <span>This field is required</span>}
        </FormErrorMessage>
      </FormControl>

      <FormControl>
        <FormLabel htmlFor='name'>Category</FormLabel>
        {/* duplcaited in SearchSection */}
        <Select
          textAlign={'center'}
          width={'auto'}
          id='category'
          {...register('category', {
            required: 'This is required',
            minLength: { value: 4, message: 'Minimum length should be 4' },
          })}>
          <option defaultChecked value=''>Please choose a category</option>
          <option value='art'>Art</option>
          <option value='comicts'>Comics</option>
          <option value='crafts'>Crafts</option>
          <option value='dance'>Dance</option>
          <option value='design'>Design</option>
          <option value='fashion'>Fashion</option>
          <option value='file&design'>Film & Video</option>
        </Select>
        <FormErrorMessage>
          {errors.category && <span>This field is required</span>}
        </FormErrorMessage>
      </FormControl>
    </Flex>
  );
};