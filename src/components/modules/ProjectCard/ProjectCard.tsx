import { Box, Text, Image, useColorModeValue, Progress, Tooltip, Flex, Spacer } from '@chakra-ui/react';
import { ProjectMetaData } from 'components/types';
import React, { useEffect } from 'react';
import { FC } from 'react';
import { resolveIPFS } from 'utils/resolveIPFS';
import { Project } from 'components/types';
import { ProjectStatus } from 'components/project/Information/ProjectStatus';
import { getEllipsisTxt } from 'utils/format';
import Link from 'next/link';
import { useReadContract } from 'wagmi';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from 'utils/getContract';

export interface ProjectCardParams {
  id: number;
  project: Project;
}

const ProjectCard: FC<ProjectCardParams> = ({ id, project }) => {
  const bgColor = useColorModeValue('none', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const [metadata, setMetadata] = React.useState<ProjectMetaData | null>(null);

  const { data } = useReadContract({
    abi: CONTRACT_ABI,
    address: CONTRACT_ADDRESS,
    functionName: 'getRounds',
    args: [BigInt(id)],
  })

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(resolveIPFS(project.url), { cache: 'force-cache' });
      setMetadata(await response.json());
    };
    fetchData().catch(console.error);
  }, [id, project]);

  return (
    <Box minHeight={"445"} maxHeight={"455px"} maxWidth="295px" bgColor={bgColor} padding={2} borderRadius="xl" borderWidth="1px" borderColor={borderColor}>
      <Box maxHeight="280px" overflow={'hidden'} borderRadius="xl">
        <Image
          src={metadata?.image}
          alt={id.toString()}
          minH="280"
          minW="280"
          boxSize="100%"
          objectFit="cover"
        />
      </Box>
      <Progress colorScheme='teal' margin={3} value={Number(data?.[Number(project.currentRound)]?.collectedFund) / Number(data?.[Number(project.currentRound)]?.fundingGoal) * 100} />
      <Box my="1" fontWeight="semibold" as="h4" noOfLines={1} marginTop={2}>
        <Link target="_blank" href={`/project/${id}`}>
          <Text align={'left'} as='u'>{project.name}</Text>
        </Link>
      </Box>
      <Tooltip label={metadata?.description} openDelay={100} aria-label="A tooltip">
        <Text my="1" fontSize='sm' as='samp' noOfLines={[1, 2, 3]}>{metadata?.description}</Text>
      </Tooltip>
      <Flex>
        <ProjectStatus status={project.status} />
        <Spacer />
        <Tooltip
          alignSelf={'right'}
          label={project.creator}
          openDelay={100}
          aria-label="A tooltip">
          <Text
            my="1"
            align={'right'}
            as='i'
            fontSize='md'
            noOfLines={1}>{`By ${getEllipsisTxt(project.creator)}`}
          </Text>
        </Tooltip>
      </Flex>
    </Box>
  );
};

export default ProjectCard;
