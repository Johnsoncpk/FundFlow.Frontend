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
                        <Tooltip label='The funding was ended, wait the creator to update the state.'>
                            <WarningTwoIcon color='red.500' />
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
                            {`${getTotalCollectedFund(rounds)}/${formatEtherToNumber(project.totalFundingGoal)}`} ETH
                        </StatHelpText>
                    </Stat>
                </StatGroup>
                <Steps colorScheme='teal' size={'lg'} variant={variant} activeStep={Number(project.currentRound)} orientation={orientation}>
                    {rounds?.map(({ collectedFund, fundingGoal, endAt }, index) => (
                        <Step
                            description={`${formatDateToString(endAt)}`}
                            label={<Text>{`${formatEtherToNumber(collectedFund)}/${formatEtherToNumber(fundingGoal)}`} ETH ({(formatEtherToNumber(collectedFund) / formatEtherToNumber(fundingGoal) * 100).toFixed(1)}%)</Text>}
                            key={index}
                        />
                    ))}
                </Steps>
            </HStack>
        </Box>)
}

export { RoundStepper }