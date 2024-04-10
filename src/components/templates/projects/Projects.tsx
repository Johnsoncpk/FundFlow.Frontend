import {
    VStack,
    Divider,
    HStack,
    Wrap,
    WrapItem,
    Center,
    Skeleton,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { SearchSection, ProjectFilterParams } from './SearchSection';
import { Project } from 'components/types';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from 'utils/getContract';
import { useReadContract } from 'wagmi';
import { ProjectCard } from 'components/modules';

const Projects: React.FC<{ isOwnerOnly?: boolean }> = ({ isOwnerOnly = false }) => {
    const [filterParams, setFilterParams] = useState({} as ProjectFilterParams);
    const [projects, setProjects] = useState<Project[] | undefined>();

    const {data, isFetching} = useReadContract({
        abi: CONTRACT_ABI,
        address: CONTRACT_ADDRESS,
        functionName: 'getProjects'
    })

    const fetchProjects = async () => {
        setProjects(data as Project[]);
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
                            <WrapItem>
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
