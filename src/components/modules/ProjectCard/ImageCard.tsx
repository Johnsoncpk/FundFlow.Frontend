import { Box, Text, Image, useColorModeValue, useDisclosure, Fade, VStack, Link } from '@chakra-ui/react';
import { FC, useEffect } from 'react';
import { resolveIPFS } from 'utils/resolveIPFS';
import NextLink from 'next/link'
import React from 'react';
import { Project, ProjectMetaData } from 'types';
import { getEllipsisTxt } from 'utils/format';

export interface ImageCardParams {
    project: Project;
}

const ImageCard: FC<ImageCardParams> = ({project}) => {
    const bgColor = useColorModeValue('none', 'gray.700');
    const borderColor = useColorModeValue('gray.200', 'gray.600');
    const { isOpen, onToggle } = useDisclosure()
    const [metadata, setMetadata] = React.useState<ProjectMetaData | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(resolveIPFS(project.url), { cache: 'force-cache' });
            setMetadata(await response.json());
        }
        fetchData().catch(console.error);
    }, []);

    return (
        <Box onMouseEnter={onToggle} onMouseLeave={onToggle} bgColor={bgColor} padding={2} borderRadius="xl" borderWidth="1px" borderColor={borderColor}>
            <Box position={'relative'} maxHeight="350" maxWidth={"350"} overflow={'hidden'} borderRadius="xl">
                <VStack>
                    <Image
                        src={metadata?.image}
                        alt={'project'}
                        minH="350"
                        minW="350"
                        objectPosition={'center'}
                        objectFit="cover"
                        filter={isOpen ? 'brightness(0.3)' : 'brightness(1)'}
                    />
                    <Fade in={isOpen}>
                        <Link target="_blank" as={NextLink} href={`/project/${project.id}`}>
                            <Box mt="1" paddingRight={'3%'} position={'absolute'} top={'60%'} left={'2%'} fontWeight="semibold" as="h4" noOfLines={[1]} marginTop={2}>
                                <Text color={'white'} align={'left'} as='u'>{project.name}</Text>
                            </Box>
                            <Box mt="1" paddingRight={'3%'} position={'absolute'} textAlign={'center'} top={'70%'} left={'3%'}>
                                <Text color={'white'} fontSize='sm' as='samp' noOfLines={[1, 2, 3]}>{metadata?.description}</Text>
                            </Box>
                        </Link>
                        <Box mt="1" position={'absolute'} textAlign={'center'} top={'90%'} right={'3%'}>
                            <Text as='i' color={'white'} fontSize='md' noOfLines={1}>{`By ${getEllipsisTxt(project.creator)}`}</Text>
                        </Box>
                    </Fade>
                    {project.id}
                </VStack>
            </Box>
        </Box>
    );
};

export default ImageCard;
