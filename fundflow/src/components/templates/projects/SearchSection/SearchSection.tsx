import {
    HStack,
    Input,
    Select,
    Text
} from '@chakra-ui/react';
import { Dispatch, FC, SetStateAction } from 'react';

type ProjectFilterParams = {
    status?: string, keyword?: string, category?: string, sortBy?: string
}

type ProjectFilterParamsProps = {
    FilterParams: ProjectFilterParams,
    SetFilterParams: Dispatch<SetStateAction<ProjectFilterParams>>
}

const SearchSection({ FilterParams, SetFilterParams }): FC<ProjectFilterParamsProps> => {
    return (
        <HStack>
            <Text fontSize='2xl'>
                Show me
            </Text>
            <Select
                value={FilterParams.status}
                onChange={(event) => {
                    SetFilterParams({ status: event.target.value, ...FilterParams })
                }}
                textAlign={'center'}
                variant='flushed'
                width={'auto'}>

                <option defaultChecked value='all'>All</option>
                <option value='live'>Live</option>
                <option value='upComing'>Up Coming</option>
            </Select>
            <Input variant='flushed' placeholder='Technology' width={'auto'} />
            <Text fontSize='2xl'> projects in</Text>
            <Select textAlign={'center'} variant='flushed' width={'auto'}>
                <option defaultChecked value='all'>All</option>
                <option value='art'>Art</option>
                <option value='comicts'>Comics</option>
                <option value='crafts'>Crafts</option>
                <option value='dance'>Dance</option>
                <option value='design'>Design</option>
                <option value='fashion'>Fashion</option>
                <option value='file&design'>Film & Video</option>
            </Select>
            <Text fontSize='2xl'>Categories sorted by </Text>
            <Select textAlign={'center'} variant='flushed' width={'auto'}>
                <option defaultChecked value='all'>Magic</option>
                <option value='popularity'>Popularity</option>
                <option value='newesy'>Newest</option>
                <option value='endDate'>End Date</option>
                <option value='mostFunded'>Most Funded</option>
            </Select>
            'Magic'
        </HStack>
    );
};

export default { SearchSection };
export type { ProjectFilterParams };

