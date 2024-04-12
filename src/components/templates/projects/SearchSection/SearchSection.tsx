import {
    HStack,
    Input,
    Select,
    Text
} from '@chakra-ui/react';
import { Dispatch, FC, SetStateAction } from 'react';

type ProjectFilterParams = {
    status: string, keyword: string, category?: string
}

type ProjectFilterParamsProps = {
    filterParams: ProjectFilterParams,
    setFilterParams: Dispatch<SetStateAction<ProjectFilterParams>>
}

const SearchSection: FC<ProjectFilterParamsProps> = ({ filterParams, setFilterParams }) => {
    return (
        <HStack>
            <Text fontSize='2xl'>
                Show me
            </Text>
            <Select
                value={filterParams.status}
                onChange={(event) => {
                    setFilterParams({ ...filterParams, status: event.target.value })
                }}
                textAlign={'center'}
                variant='flushed'
                width={'auto'}>

                <option defaultChecked value='all'>All</option>
                <option value='0'>Live</option>
                <option value='1'>Completed</option>
                <option value='2'>Failed</option>
                <option value='3'>Canceled</option>
            </Select>
            <Text fontSize='2xl'>
                projects with
            </Text>

            <Input
                value={filterParams.keyword}
                onChange={(event) => {
                    setFilterParams({ ...filterParams, keyword: event.target.value })
                }}
                variant='flushed'
                placeholder='keyword'
                width={'auto'} />
        </HStack>
    );
};

export default SearchSection;
export type { ProjectFilterParams };

