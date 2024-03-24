import { Flex, Button, FormControl, FormErrorMessage, FormLabel, NumberInput, NumberInputField, NumberDecrementStepper, NumberIncrementStepper, NumberInputStepper, Input, Text } from "@chakra-ui/react";
import moment from "moment";
import { useEffect, useState } from "react";
import { Step, Steps, useSteps } from "chakra-ui-steps";
import React from 'react';
import { FormProps } from "components/types";

function FirstRound() {
  const [fundingGoal, setFundingGoal] = useState<number>(10000);
  const format = (val: number) => `$ ${val}`;
  const parse = (val: string) => Number(val.toString().replace(/^\$/, ''));

  return (
    <Flex marginY={'30px'} flexDir="column" width="100%" gap={4}>
      <FormControl>
        <FormLabel htmlFor='fundingGoal'>Funding Goal 💰</FormLabel>
        <NumberInput
          id='fundingGoal'
          onChange={(value) => setFundingGoal(parse(value))}
          value={format(fundingGoal)}
          allowMouseWheel
          step={1000}
          min={1000}
          max={10000000}>
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </FormControl>

      <FormControl>
        <FormLabel htmlFor='fundRoundEndTime'>Funding Round End Time 🕰️</FormLabel>
        <Input
          placeholder="Select Date and Time"
          size="md"
          id="fundRoundEndTime"
          type="datetime-local"
          value={moment().add(1, 'month').endOf('day').format('YYYY-MM-DDTHH:mm')}
        />
      </FormControl>
    </Flex>
  )
}

function ReportRound(index: number, steps: any, setSteps: any) {  `1`

  const addProgressStep = (insertAt: number) => {
    const nextArtists = [
      ...steps.slice(0, insertAt),
      { title: 'Progress Report Round', description: 'When you have to progress update to receive more fund', content: ReportRound },
      ...steps.slice(insertAt)
    ];
    setSteps(nextArtists);
  }

  const removeProgressStep = (removeAt: number) => {
    const newSteps = steps.filter((_: any, i: number) => i !== removeAt);
    setSteps(newSteps);
  }

  return (
    <>
      <Flex marginY={'30px'} flexDir="column" width="100%" gap={4}>
        <FormControl>
          <FormLabel htmlFor={`reportRoundEndTime${index}`}>Progress Round {index} End At👨‍💻👩🏻‍💻</FormLabel>
          <Input
            placeholder="Select Date and Time"
            size="md"
            id={`reportRoundEndTime${index}`}
            type="datetime-local"
            value={moment().add(index + 1, 'month').endOf('day').format('YYYY-MM-DDTHH:mm')}
          />
        </FormControl>
      </Flex>
      <Flex width="100%" justify="flex-end" gap={4}>
        <Button
          isDisabled={steps.length === 3}
          onClick={() => { removeProgressStep(index) }}
          size="sm"
          variant="ghost"
        >
          Remove this round
        </Button>
        <Button size="sm" onClick={() => { addProgressStep(index) }}>
          Add more round
        </Button>
      </Flex>
    </>
  )
}

function LastRound(index: number) {

  const [lastRoundEndTime, setLastRoundEndTime] = useState<string>();

  useEffect(() => {
    return () => {
      setLastRoundEndTime(moment().add(index + 1, 'month').endOf('day').format('YYYY-MM-DDTHH:mm'));
    };
  })


  return (
    <Flex marginY={'30px'} flexDir="column" width="100%" gap={4}>
      <FormControl>
        <FormLabel htmlFor='lastRoundEndTime'>Whole Project End Time 🕰️</FormLabel>
        <Input
          placeholder="Select Date and Time"
          size="md"
          id="lastRoundEndTime"
          type="datetime-local"
          onChange={(e) => { setLastRoundEndTime(moment(new Date(e.target.value)).format('YYYY-MM-DDTHH:mm')); }}
          value={lastRoundEndTime}
        />
      </FormControl>
    </Flex>
  )
}

function RoundSteps() {
  const { activeStep, setStep } = useSteps({
    initialStep: 0,
  });

  const [steps, setSteps] = useState([
    { title: 'First Round', description: 'When the project not accepting backer anymore', content: FirstRound },
    { title: 'Report Round', description: 'When you have to progress update to receive more fund', content: ReportRound },
    { title: 'Last Round', description: 'When you will receive all the remaining fund', content: LastRound },
  ]);

  return (
    <Steps variant="simple" orientation="vertical" colorScheme="blue" activeStep={activeStep}>
      {steps.map(({ title, description, content }, index) => (
        <Step label={
          <Text onClick={() => { setStep(index) }}>
            {(index === 0 || index === steps.length - 1) ? title : `${title} ${index}`}
          </Text>
        }
          description={description}
          key={title + index}>
          {content(index, steps, setSteps)}
        </Step>
      ))}
    </Steps>
  )
}

export const Form2: React.FC<FormProps> = (props) => {
  return (
    <Flex flexDir="column" width="100%" gap={4}>
      {RoundSteps()}
    </Flex>
  );
};