import { Flex, Button, FormControl, FormLabel, NumberInput, NumberInputField, NumberDecrementStepper, NumberIncrementStepper, NumberInputStepper, Input, Text } from "@chakra-ui/react";
import moment from "moment";
import { useEffect, useState } from "react";
import { Step, Steps, useSteps } from "chakra-ui-steps";
import React from 'react';
import { FormProps } from "components/types";

function FundingRound(
  index: number,
  stepLength: number,
  props: FormProps,
  addProgressStep: (insertAt: number) => void,
  removeProgressStep: (removeAt: number) => void) {

  const format = (val: number) => `$ ${val}`;
  const parse = (val: string) => Number(val.toString().replace(/^\$/, ''));

  return (
    <>
      <Flex marginY={'30px'} flexDir="column" width="100%" gap={4}>
        <FormControl>
          <FormLabel htmlFor='fundingGoal'>Funding Goal 💰</FormLabel>
          <NumberInput
            id='fundingGoal'
            onChange={(value) => setFundingGoal(parse(value))}
            value={format(props.projectData.rounds[index].fundingGoal)}
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
          <FormLabel htmlFor={`reportRoundEndTime${index}`}>Progress Round {index} End At👨‍💻👩🏻‍💻</FormLabel>
          <Input
            placeholder="Select Date and Time"
            size="md"
            onChange={(e) => setEndAt(e.target.value)}
            id={`reportRoundEndTime${index}`}
            type="datetime-local"
            value={props.projectData.rounds[index].endAt}
          />
        </FormControl>
      </Flex>
      {
        (index !== stepLength - 1) &&
        (index !== 0) &&
        <Flex width="100%" justify="flex-end" gap={4}>
          <Button
            isDisabled={stepLength === 3}
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
      }
    </>
  )
}

const RoundSteps: React.FC<FormProps> = (props) => {
  const { activeStep, setStep, addProgressStep, removeProgressStep, steps } = useRoundSteps(props);

  return (
    <Steps variant="simple" orientation="vertical" colorScheme="blue" activeStep={activeStep}>
      {props.projectData.rounds.map(({
        fundingGoal,
        endAt
      }, index) => (
        <Step label={
          <Text onClick={() => { setStep(index) }}>
            {(index === 0 || index === steps.length - 1) ? title : `${title} ${index}`}
          </Text>
        }
          description={description}
          key={title + index}>
          {FundingRound(index, steps.length, props, addProgressStep, removeProgressStep)}
        </Step>
      ))}
    </Steps>
  )
}

const useRoundSteps = (props: FormProps) => {
  const { activeStep, setStep } = useSteps({
    initialStep: 0,
  });

  const addProgressStep = (insertAt: number) => {
    const nextArtists = [
      ...steps.slice(0, insertAt),
      getReportRound(insertAt),
      ...steps.slice(insertAt)
    ];
    setSteps(nextArtists);
  }

  const removeProgressStep = (removeAt: number) => {
    const newSteps = steps.filter((_: any, i: number) => i !== removeAt);
    setSteps(newSteps);
  }

  const [steps, setSteps] = useState([
    { title: 'First Round', description: 'Show the ideas and prototype!' },
    getReportRound(),
    { title: 'Last Round', description: 'Collect all the remaining fund!' },
  ]);

  function getReportRound() {
    addRound(index, 10000, moment().add(1, 'month').endOf('day').format('YYYY-MM-DDTHH:mm'));
    return { title: 'Report Round', description: 'Disclose more information to the backers!' };
  }

  const addRound = (
    insertAt: number,
    fundingGoal: number,
    endAt: number) => {

    const newRound = [
      ...props.projectData.rounds.slice(0, insertAt),
      { fundingGoal, endAt },
      ...props.projectData.rounds.slice(insertAt)
    ];
    props.setProjectData({ ...props.projectData, rounds: newRound });
  }

  return { activeStep, setStep, addProgressStep, removeProgressStep, steps };
};

export const Form2: React.FC<FormProps> = (props) => {
  return (
    <Flex flexDir="column" width="100%" gap={4}>
      {RoundSteps(props)}
    </Flex>
  );
};