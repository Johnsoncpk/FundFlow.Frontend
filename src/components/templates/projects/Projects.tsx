import {
    VStack,
    Divider,
    HStack,
    Wrap,
    WrapItem,
    Center,
    Skeleton,
    Heading,
    Text
} from '@chakra-ui/react';
import { useEffect, useState, FC } from 'react';
import { SearchSection, ProjectFilterParams } from './SearchSection';
import { Project } from 'components/types';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from 'utils/getContract';
import { useReadContract } from 'wagmi';
import { ProjectCard } from 'components/modules';
import { useAccount } from 'wagmi';
import Link from 'next/link';

const Projects: FC<{ isOwnerOnly?: boolean }> = ({ isOwnerOnly = false }) => {
    const [filterParams, setFilterParams] = useState(
        {
            keyword: '',
            status: 'all',
        } as ProjectFilterParams);
    const [projects, setProjects] = useState<Project[] | undefined>();
    const { address } = useAccount();


    const response = useReadContract({
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

        if (isOwnerOnly) {
            result = result?.filter((project) => project.creator === address);
        } else {
            result = result?.filter((project) =>
                project.status.toString() === filterParams.status ||
                filterParams.status === 'all'
            );

            result = result?.filter((project) => (project.name.toLocaleLowerCase().includes(filterParams.keyword.toLocaleLowerCase())) ||filterParams.keyword === ''
            );
        }
        setProjects(result as Project[]);
    };

    useEffect(() => { fetchProjects().catch(console.error); }, [filterParams]);

    return (
        <div>
            <Skeleton isLoaded={!response.isFetching}>
                <VStack spacing={8}>
                    {
                        isOwnerOnly ?
                            <Heading>Your Projects</Heading> :
                            <>
                                <SearchSection filterParams={filterParams} setFilterParams={setFilterParams} />
                            </>
                    }
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
                                        {isOwnerOnly &&
                                        <Text margin={4} fontSize='xl' as='u'>
                                            <Link href="/project/create">Would you like to create a crowdfunding project?</Link>
                                        </Text>}
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
