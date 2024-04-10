import { Box, Stat, StatGroup, StatHelpText, StatLabel, StatNumber, Text, HStack, VStack } from '@chakra-ui/react'
import { Step, Steps } from 'chakra-ui-steps'
import { ProjectProps } from "components/types"
import { formatDateToString, formatEtherToNumber, getTotalCollectedFund } from 'utils/format';

const RoundStepper: React.FC<ProjectProps & {
    variant: "circles" | "circles-alt" | "simple" | undefined,
    orientation?: "vertical" | "horizontal" | undefined
}> = ({ project, rounds, variant, orientation = 'horizontal' }) => {

    return (
        <Box w='100%' marginX={"10px"} >
             <Text marginY={'4px'} as={'u'} fontSize='2xl'>Round Status</Text>
            <HStack >
                <StatGroup marginRight={"10px"}>
                    <Stat>
                        <StatLabel>Progress</StatLabel>
                        <StatNumber>{(getTotalCollectedFund(rounds) / formatEtherToNumber(project.totalFundingGoal) * 100).toFixed(2)}%</StatNumber>
                        <StatHelpText>
                            {getTotalCollectedFund(rounds) + '/' + formatEtherToNumber(project.totalFundingGoal)} ETH
                        </StatHelpText>
                    </Stat>
                </StatGroup>
                <Steps size={'lg'} variant={variant} activeStep={Number(project.currentRound)} orientation={orientation}>
                    {rounds?.map(({ collectedFund, fundingGoal, endAt }, index) => (
                        <Step
                            description={`${formatDateToString(endAt)}`}
                            label={<Text>{formatEtherToNumber(collectedFund) + '/' + formatEtherToNumber(fundingGoal)} ETH ({formatEtherToNumber(collectedFund) / formatEtherToNumber(fundingGoal) * 100}%)</Text>}
                            key={index}
                        />
                    ))}
                </Steps>
            </HStack>


        </Box>)
}

export { RoundStepper }