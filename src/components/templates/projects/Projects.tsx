import {
    VStack,
    Divider,
    HStack,
    Wrap,
    WrapItem,
    Center,
    Skeleton,
} from '@chakra-ui/react';
import { useEffect, useState, FC } from 'react';
import { SearchSection, ProjectFilterParams } from './SearchSection';
import { Project } from 'components/types';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from 'utils/getContract';
import { useReadContract } from 'wagmi';
import { ProjectCard } from 'components/modules';
import { useAccount } from 'wagmi';

const Projects: FC<{ isOwnerOnly?: boolean }> = ({ isOwnerOnly = false }) => {
    const [filterParams, setFilterParams] = useState(
        {
            keyword: '',
            status: 'all',
        } as ProjectFilterParams);
    const [projects, setProjects] = useState<Project[] | undefined>();
    const { address } = useAccount();


    const { data, isFetching } = useReadContract({
        abi: CONTRACT_ABI,
        address: CONTRACT_ADDRESS,
        functionName: 'getProjects'
    })

    const fetchProjects = async () => {
        let result = data?.map((project, index) => {
            return {
                id: index,
                ...project
            }
        })

        if (isOwnerOnly) {
            result = result?.filter((project) => project.creator === address);
        } else {
            result = result?.filter((project) =>
                project.status.toString() === filterParams.status ||
                filterParams.status === 'all' ||
                filterParams.status === undefined
            );

            result = result?.filter((project) =>
                (filterParams.keyword !== undefined && project.name.includes(filterParams.keyword)) ||
                filterParams.keyword === undefined ||
                filterParams.keyword === ''
            );
        }
        setProjects(result as Project[]);
    };

    useEffect(() => { fetchProjects().catch(console.error); }, [filterParams]);

    return (
        <div>
            <Skeleton isLoaded={!isFetching}>
                <VStack spacing={8}>
                    {
                        !isOwnerOnly &&
                        <SearchSection filterParams={filterParams} setFilterParams={setFilterParams} />
                    }
                    <Divider />
                    <HStack>
                        <Wrap spacing='20px'>
                            {projects?.map((project, id) => (
                                <WrapItem key={id}>
                                    <Center>
                                        <ProjectCard project={project} id={id} />
                                    </Center>
                                </WrapItem>
                            ))}
                        </Wrap>
                    </HStack>
                </VStack>
            </Skeleton>
        </div>
    );
};

export default Projects;
