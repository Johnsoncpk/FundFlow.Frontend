import { WarningTwoIcon } from '@chakra-ui/icons';
import { Box, Stat, StatGroup, StatHelpText, StatLabel, StatNumber, Text, HStack, Tooltip } from '@chakra-ui/react'
import { Step, Steps } from 'chakra-ui-steps'
import { ProjectProps } from "components/types"
import { FC } from 'react';
import { formatDateToString, formatEtherToNumber, getTotalCollectedFund } from 'utils/format';

const RoundStepper: FC<ProjectProps & {
    variant: "circles" | "circles-alt" | "simple" | undefined,
    orientation?: "vertical" | "horizontal" | undefined
}> = ({ project, rounds, variant, orientation = 'horizontal' }) => {

    return (
        <Box w='100%' marginX={"10px"} >
            <Text marginY={'4px'} fontSize='2xl'><Text as={'u'}>Round Status</Text>
                {
                    rounds[Number(project?.currentRound)]?.endAt < Date.now() / 1000 ?
                        <Tooltip label='The funding round was ended.'>
                            <WarningTwoIcon />
                        </Tooltip> :
                        <></>
                }
            </Text>
            <HStack >
                <StatGroup marginRight={"10px"}>
                    <Stat>
                        <StatLabel>Progress</StatLabel>
                        <StatNumber>{(getTotalCollectedFund(rounds) / formatEtherToNumber(project.totalFundingGoal) * 100).toFixed(1)}%</StatNumber>
                        <StatHelpText>
                            {`${getTotalCollectedFund(rounds).toFixed(1)}/${formatEtherToNumber(project.totalFundingGoal).toFixed(1)}`} ETH
                        </StatHelpText>
                    </Stat>
                </StatGroup>
                <Steps colorScheme='teal' size={'lg'} variant={variant} activeStep={Number(project.currentRound) + (project.status===1? 1 : 0)} orientation={orientation}>
                    {rounds?.map(({ collectedFund, fundingGoal, endAt }, index) => (
                        <Step
                            state={(project.status===2? 'error' : undefined)}
                            description={`${formatDateToString(endAt)}`}
                            label={<Text>{`${formatEtherToNumber(collectedFund).toFixed(1)}/${formatEtherToNumber(fundingGoal).toFixed(1)}`} ETH ({(formatEtherToNumber(collectedFund) / formatEtherToNumber(fundingGoal) * 100).toFixed(1)}%)</Text>}
                            key={index}
                        />
                    ))}
                </Steps>
            </HStack>
        </Box>)
}

export { RoundStepper }