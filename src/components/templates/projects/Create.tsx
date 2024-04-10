import React, { useEffect, useState } from 'react';
import { Box } from "@chakra-ui/layout";
import { Alert, AlertDescription, AlertIcon, AlertTitle, Button, Flex, Text, useToast } from "@chakra-ui/react";
import { Step, Steps, useSteps } from "chakra-ui-steps";
import { Form1, Form2, Form3, Form4 } from "components/templates/projects/StepForms";
import { ProjectData } from 'components/types';
import { INIT_VALUE } from 'components/templates/projects/StepForms/DefaultWYSIWYGValue';
import { uploadProjectDataToIpfs } from 'utils/useIpfs';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "utils/getContract";
import { useWaitForTransactionReceipt, useWriteContract, useAccount } from "wagmi";
import Link from 'next/link';
import { useWeb3Modal } from '@web3modal/wagmi/react';

const steps = [
  {
    label: "Basic Information",
    form: Form1,
  },
  {
    label: "Round Setting",
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

export const Create = ({
  variant,
}: {
  variant: "circles" | "circles-alt" | "simple" | undefined;
}) => {
  const { nextStep, prevStep, reset, setStep, activeStep } = useSteps({
    initialStep: 0,
  });
  const isLastStep = activeStep === steps.length - 1;
  const hasCompletedAllSteps = activeStep === steps.length;

  const [projectData, setProjectData] = useState<ProjectData>(INIT_VALUE);

  const { open } = useWeb3Modal()

  const {
    data: hash,
    isPending,
    writeContractAsync
  } = useWriteContract()

  const toast = useToast()

  const account = useAccount()

  // status checkign should do in server side
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  useEffect(() => {
    if (isConfirmed) {
      toast({
        title: `Create Project Transaction Confirmed!`,
        description:
          (<Text>
            Project Created!
            <Text as={'u'}>
              <br />
              <Link href={`https://sepolia.etherscan.io/tx/${hash}`}> Check the  Transaction status here!</Link>
            </Text>
          </Text>),
        status: "success",
        position: 'top',
        isClosable: true,
      })
    }
  }, [isConfirmed])

  useEffect(() => {
    if (isConfirming) {
      toast({
        title: `Transaction Created!`,
        description:
          (<Text as="u">
            <Link href={`https://sepolia.etherscan.io/tx/${hash}`}> Check the  Transaction status here!</Link>
          </Text>),
        status: "info",
        position: 'top',
        isClosable: true,
      })
    }
  }, [isConfirming])

  async function submitForm() {
    try {
      if(!account.isConnected){
        open({ view: 'Connect' })
        return;
      }
      const cid = await uploadProjectDataToIpfs(projectData);
        await writeContractAsync({
          address: CONTRACT_ADDRESS,
          abi: CONTRACT_ABI,
          functionName: 'createProject',
          args: [
            projectData.name,
            `ipfs://${cid}`,
            // `ipfs://QmRA8vcWLyciJpZdziNgvYNiDo3P4agCnrKoJomvM5uXjn`,
            projectData.rounds.map((round) => {
              return {
                id: BigInt(0),
                amountSentToCreator: BigInt(0),
                collectedFund: BigInt(0),
                fundingGoal: BigInt(round.fundingGoal),
                endAt: BigInt(round.endAt)
              }
            }),
            BigInt(projectData.totalFundingGoal)
          ],
        })

      nextStep();
    } catch (error: any) {
      toast({
        title: `Error: ${error.name}`,
        description: error.shortMessage,
        position: "top",
        status: "error",
        isClosable: true,
      })

      if (error.name === "ConnectorNotConnectedError") {
        open({ view: 'Connect' })
      }
    }
  }

  return (
    <Flex flexDir="column" width="100%">
      <Text align={'center'} fontSize='3xl' marginBottom={'30px'}>🎨 Create Your Project 🛠️</Text>
      <form>
        <Steps variant={variant} colorScheme="blue" activeStep={activeStep}>
          {steps.map(({ label, form }, index) => (
            <Step label={<Text onClick={() => { setStep(index) }}>{label}</Text>} key={label + index}>
              <Box sx={{ p: 8, my: 8, rounded: "md" }}>
                {form({ projectData, setProjectData })}
              </Box>
            </Step>
          ))}
        </Steps>
        {hasCompletedAllSteps && (
          <div>
            <Box sx={{ my: 8, p: 8, rounded: "md" }}>
              <Alert
                status='success'
                variant='top-accent'
                flexDirection='column'
                alignItems='center'
                justifyContent='center'
                textAlign='center'
                height='200px'
              >
                <AlertIcon boxSize='40px' mr={0} />
                <AlertTitle mt={4} mb={1} fontSize='lg'>
                  🍾Create Project Request Submmited!🥂
                </AlertTitle>
                <AlertDescription maxWidth='sm'>
                  Project creation may take some times. Please wait for 5-10 mins!
                </AlertDescription>
              </Alert>
            </Box>
            <Flex width="100%" justify="center" gap={4}>
              <Button onClick={reset}>
                Back to home page
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
              <Button disabled={isPending} size="sm" onClick={
                (_: React.MouseEvent<HTMLButtonElement>) => {
                  submitForm();
                }} colorScheme='blue'>
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