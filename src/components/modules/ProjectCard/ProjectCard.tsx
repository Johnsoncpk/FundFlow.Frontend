import { Box, Text, Image, useColorModeValue, Progress, Tooltip } from '@chakra-ui/react';
import { ProjectMetaData } from 'components/types';
import React, { useEffect } from 'react';
import { FC } from 'react';
import { resolveIPFS } from 'utils/resolveIPFS';
import { Project } from 'components/types';
import { getEllipsisTxt } from 'utils/format';
import Link from 'next/link';

export interface ProjectCardParams {
  id: number;
  project: Project;
}

const ProjectCard: FC<ProjectCardParams> = ({ id, project }) => {
  const bgColor = useColorModeValue('none', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const [metadata, setMetadata] = React.useState<ProjectMetaData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(resolveIPFS(project.url), { cache: 'force-cache' });
      setMetadata(await response.json());
    };
    fetchData().catch(console.error);
  }, []);

  return (
    <Box minHeight={"445"} maxHeight={"445px"} maxWidth="295px" bgColor={bgColor} padding={2} borderRadius="xl" borderWidth="1px" borderColor={borderColor}>
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
      <Progress margin={3} value={64} />
      <Box my="1" fontWeight="semibold" as="h4" noOfLines={1} marginTop={2}>
        <Link target="_blank" href={`/project/${id}`}>
          <Text align={'left'} as='u'>{project.name}</Text>
        </Link>
      </Box>
      <Tooltip label={metadata?.description} openDelay={100} aria-label="A tooltip">
        <Text my="1" fontSize='sm' as='samp' noOfLines={[1, 2, 3]}>{metadata?.description}</Text>
      </Tooltip>
      <Tooltip label={project.creator} openDelay={100} aria-label="A tooltip">
        <Text my="1" align={'right'} as='i' fontSize='md' noOfLines={1}>{getEllipsisTxt(project.creator)}</Text>
      </Tooltip>
    </Box>
  );
};

export default ProjectCard;
