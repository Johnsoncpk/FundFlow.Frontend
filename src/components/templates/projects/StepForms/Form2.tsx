import { Flex, Button, FormControl, FormLabel, NumberInput, NumberInputField, NumberDecrementStepper, NumberIncrementStepper, NumberInputStepper, Input, Text } from "@chakra-ui/react";
import moment from "moment";
import { useState } from "react";
import { Step, Steps, useSteps } from "chakra-ui-steps";
import React from 'react';
import { FormProps } from "components/types";
import { ethers, utils } from "ethers";

function FundingRound(
  index: number,
  stepLength: number,
  props: FormProps,
  addProgressStep: (insertAt: number) => void,
  removeProgressStep: (removeAt: number) => void) {

  const setFundingGoal = (value: string) => {
    const newRound = [...props.projectData.rounds];
    newRound[index].fundingGoal = utils.parseEther(value).toBigInt();
    props.setProjectData({ 
      ...props.projectData, 
      totalFundingGoal: newRound.reduce<bigint>((n, { fundingGoal }) => n + fundingGoal, BigInt(0)), 
      rounds: newRound });
  }

  const setEndAt = (value: string) => {
    const newRound = [...props.projectData.rounds];
    newRound[index].endAt = moment(value).unix();
    props.setProjectData({ ...props.projectData, rounds: newRound });
  }

  return (
    <>
      <Flex marginY={'30px'} flexDir="column" width="100%" gap={4}>
        <FormControl>
          <FormLabel htmlFor={`fundingGoal${index}`}>Funding Goal (ETH)💰</FormLabel>
          <NumberInput
            id={`fundingGoal${index}`}
            onChange={(value) => setFundingGoal(value)}
            value={utils.formatEther(props.projectData.rounds[index].fundingGoal)}
            allowMouseWheel
            step={0.1}
            max={10000000}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor={`reportRoundEndTime${index}`}>Round {index + 1} End At👨‍💻👩🏻‍💻</FormLabel>
          <Input
            placeholder="Select Date and Time"
            size="md"
            onChange={(e) => setEndAt(e.target.value)}
            id={`reportRoundEndTime${index}`}
            type="datetime-local"
            value={moment.unix(props.projectData.rounds[index].endAt).format("YYYY-MM-DDTHH:mm")}
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
          <Button size="sm" onClick={() => { addProgressStep(index+1) }}>
            Add more round
          </Button>
        </Flex>
      }
    </>
  )
}

const RoundSteps: React.FC<FormProps> = (props) => {
  const { addProgressStep, removeProgressStep, steps } = useRoundSteps(props);

  const { activeStep, setStep } = useSteps({
    initialStep: 0,
  });

  function getTitle(index: number): string{
    switch (index) {
      case 0:
        return 'First Round';
      case props.projectData.rounds.length - 1:
        return 'Last Round';
      default:
        return `Report Round ${index}`;
    }
  }

  function getDescription(index: number): string{
    switch (index) {
      case 0:
        return 'Show the ideas and prototype!';
      case props.projectData.rounds.length - 1:
        return 'Collect all the remaining fund!';
      default:
        return `Update the project status to get more Fund!`;
    }
  }

  return (
    <Steps variant="simple" orientation="vertical" colorScheme="blue" activeStep={activeStep}>
      {props.projectData.rounds.map((_, index) => (
        <Step label={
          <Text onClick={() => { setStep(index) }}>
            {getTitle(index)}
          </Text>
        }
          description={getDescription(index)}
          key={index}>
          {FundingRound(index, steps.length, props, addProgressStep, removeProgressStep)}
        </Step>
      ))}
    </Steps>
  )
}

const useRoundSteps = (props: FormProps) => {
  const [steps, setSteps] = useState([{},{},{}]);

  const addProgressStep = (insertAt: number) => {
    addRound(insertAt, utils.parseEther('1').toBigInt(), moment().add(insertAt + 1, 'month').endOf('day').unix());
    setSteps([...steps, {}]);
  }

  const removeProgressStep = (removeAt: number) => {
    const newSteps = steps.filter((_: any, i: number) => i !== removeAt);
    setSteps(newSteps);
    const newRound = props.projectData.rounds.filter((_: any, i: number) => i !== removeAt);
    props.setProjectData({ ...props.projectData, rounds: newRound });
  }

  const addRound = (
    insertAt: number,
    fundingGoal: bigint,
    endAt: number) => {

    const newRound = [
      ...props.projectData.rounds.slice(0, insertAt),
      { fundingGoal, endAt },
      ...props.projectData.rounds.slice(insertAt)
    ];
    props.setProjectData({ ...props.projectData, rounds: newRound });
  }

  return { addProgressStep, removeProgressStep, steps, addRound };
};

export const Form2: React.FC<FormProps> = (props) => {
  return (
    <Flex flexDir="column" width="100%" gap={4}>
        <Text fontSize='xl'>Total Rounds: <Text as='u' >{props.projectData.rounds.length}</Text> Total Funding Goal: <Text as='u'>{utils.formatEther(props.projectData.totalFundingGoal)} ETH</Text></Text>
      <RoundSteps {...props} />
    </Flex>
  );
};