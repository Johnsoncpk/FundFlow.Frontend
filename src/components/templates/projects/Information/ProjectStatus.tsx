import { Text } from '@chakra-ui/react';
import { FC } from "react"

export const ProjectStatus: FC<{ status: number }> = ({ status }) => {
    if (status === 1) {
        return (
            <Text align={'left'} color="green.500" fontWeight="bold" fontSize="lg">
                Completed
            </Text>
        )
    }

    if (status === 2) {
        return (
            <Text align={'left'} color="red.500" fontWeight="bold" fontSize="lg">
                Failed
            </Text>
        )
    }

    if (status === 3) {
        return (
            <Text align={'left'} color="grey.500" fontWeight="bold" fontSize="lg">
                Canceled
            </Text>
        )
    }

    return (
        <Text align={'left'} color="yellow.500" fontWeight="bold" fontSize="lg">
            Active
        </Text>
    )
}
