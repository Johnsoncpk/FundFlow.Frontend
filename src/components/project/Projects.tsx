import {
    VStack,
    Divider,
    HStack,
    Wrap,
    WrapItem,
    Center,
    Skeleton,
    Text
} from '@chakra-ui/react';
import { useEffect, useState, FC } from 'react';
import { SearchSection, ProjectFilterParams } from './SearchSection';
import { Project } from 'types';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from 'utils/getContract';
import { useReadContract } from 'wagmi';
import { ProjectCard } from 'components/modules';
import { sepolia, hardhat } from 'wagmi/chains';

const Projects: FC = () => {
    const [filterParams, setFilterParams] = useState(
        {
            keyword: '',
            status: 'all',
        } as ProjectFilterParams);
    const [projects, setProjects] = useState<Project[] | undefined>();

    const response = useReadContract({
        chainId: process.env.chain === "sepolia" ? sepolia.id : hardhat.id,
        abi: CONTRACT_ABI,
        address: CONTRACT_ADDRESS,
        functionName: 'getProjects'
    })

    const fetchProjects = async () => {
        let result = response.data?.map((project, index) => {
            return {
                id: index,
                ...project
            }
        })

        result = result?.filter((project) =>
            project.status.toString() === filterParams.status ||
            filterParams.status === 'all'
        );

        result = result?.filter((project) => (project.name.toLocaleLowerCase().includes(filterParams.keyword.toLocaleLowerCase())) || filterParams.keyword === ''
        );

        setProjects(result as Project[]);
    };

    useEffect(() => { fetchProjects().catch(console.error); }, [filterParams, response.isFetched]);

    return (
        <div>
            <Skeleton isLoaded={!response.isFetching}>
                <VStack spacing={4}>
                    <SearchSection filterParams={filterParams} setFilterParams={setFilterParams} />
                    <Divider />
                    <HStack>
                        <Wrap spacing='20px'>
                            {projects?.map((project, id) => (
                                <WrapItem key={id}>
                                    <Center>
                                        <ProjectCard project={project} id={project.id} />
                                    </Center>
                                </WrapItem>
                            ))}

                            {projects?.length === 0 && (
                                <Center>
                                    <Text textAlign={'center'}>
                                        No projects found.<br />
                                    </Text>
                                </Center>
                            )}
                        </Wrap>
                    </HStack>
                </VStack>
            </Skeleton>
        </div>
    );
};

export default Projects;
