import { Text, Tooltip } from '@chakra-ui/react';
import { FC } from "react"

export const ProjectStatus: FC<{ status: number }> = ({ status }) => {
    if (status === 1) {
        return (
            <Tooltip label='Funded Already Sent to Owner'>
                <Text align={'left'} color="green.500" fontWeight="bold" fontSize="lg">
                    Completed
                </Text>
            </Tooltip>
        )
    }

    if (status === 2) {
        return (
            <Tooltip label='Funded Already Returned to Backers'>
                <Text align={'left'} color="red.500" fontWeight="bold" fontSize="lg">
                    Failed
                </Text>
            </Tooltip>
        )
    }

    if (status === 3) {
        return (
            <Tooltip label='Funded Already Returned to Backers'>
                <Text align={'left'} color="grey" fontWeight="bold" fontSize="lg">
                    Canceled
                </Text>
            </Tooltip>
        )
    }

    return (
        <Tooltip label='Come and Check the Project!'>
            <Text align={'left'} color="yellow.500" fontWeight="bold" fontSize="lg">
                Active
            </Text>
        </Tooltip>
    )
}
