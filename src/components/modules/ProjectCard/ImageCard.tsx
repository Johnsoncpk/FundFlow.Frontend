import { Box, Text, Image, useColorModeValue, useDisclosure, Fade, VStack, Link } from '@chakra-ui/react';
import { FC } from 'react';
import { resolveIPFS } from 'utils/resolveIPFS';
import NextLink from 'next/link'

export interface ImageCardParams {
    id: number;
    project: {
        name: string;
        url: string;
        totalFundingGoal: bigint;
        totalRound: bigint;
        currentRound: bigint;
        creator: `0x${string}`;
        status: number;
    };
}

const ImageCard: FC<ImageCardParams> = (props) => {
    const bgColor = useColorModeValue('none', 'gray.700');
    const borderColor = useColorModeValue('gray.200', 'gray.600');
    const { isOpen, onToggle } = useDisclosure()

    return (
        <Box onMouseEnter={onToggle} onMouseLeave={onToggle} bgColor={bgColor} padding={2} borderRadius="xl" borderWidth="1px" borderColor={borderColor}>
            <Box position={'relative'} maxHeight="350" maxWidth={"350"} overflow={'hidden'} borderRadius="xl">
                <VStack>
                    <Image
                        src={resolveIPFS((props.project.url as { image?: string })?.image)}
                        alt={'project'}
                        minH="350"
                        minW="350"
                        objectPosition={'center'}
                        objectFit="cover"
                        filter={isOpen ? 'brightness(0.3)' : 'brightness(1)'}
                    />
                    <Fade in={isOpen}>
                        <Link as={NextLink} href={`/project/${props.id}`}>
                            <Box mt="1" paddingRight={'3%'} position={'absolute'} top={'60%'} left={'2%'} fontWeight="semibold" as="h4" noOfLines={[1]} marginTop={2}>
                                <Text color={'white'} align={'left'} as='b'>{props.project.name}</Text>
                            </Box>
                            <Box mt="1" paddingRight={'3%'} position={'absolute'} textAlign={'center'} top={'70%'} left={'3%'}>
                                <Text color={'white'} fontSize='sm' as='samp' noOfLines={[1, 2, 3]}>{resolveIPFS((props.project.url as { description?: string })?.description)}</Text>
                            </Box>
                        </Link>
                        <Box mt="1" position={'absolute'} textAlign={'center'} top={'90%'} right={'3%'}>
                            <Text as='i' color={'white'} fontSize='md' noOfLines={1}>By Jay Oliva</Text>
                        </Box>
                    </Fade>
                    {props.id}
                </VStack>
            </Box>
        </Box>
    );
};

export default ImageCard;
