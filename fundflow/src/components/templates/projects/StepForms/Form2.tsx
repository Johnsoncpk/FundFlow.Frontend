import { Flex, FormControl, FormErrorMessage, FormLabel, NumberInput, InputGroup, InputLeftAddon, InputRightAddon, Text, Textarea } from "@chakra-ui/react";
import { errors } from "ethers";
import { useState } from "react";

export const Form2 = (register: any, errors: any) => {
  const [fundingGoal, setFundingGoal] = useState<number>(100000);

  return (
    <Flex flexDir="column" width="100%" gap={4}>
      <Text>
      <FormControl>
        <FormLabel htmlFor='name'>Funding Goal</FormLabel>
        <InputGroup>
        <InputLeftAddon>
          $ USD
        </InputLeftAddon>
        <NumberInput placeholder={fundingGoal.toLocaleString()} />
      </InputGroup>
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
      </Text>
    </Flex>
  );
};