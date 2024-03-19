import { Box, Text, Image, useColorModeValue, useDisclosure, Fade, VStack, Link } from '@chakra-ui/react';
import { EvmNft } from '@moralisweb3/common-evm-utils';
import { FC } from 'react';
import { resolveIPFS } from 'utils/resolveIPFS';
import NextLink from 'next/link'

export interface ImageCardParams {
    key: number;
    nft: EvmNft;
}

const ImageCard: FC<ImageCardParams> = ({ nft: { name, metadata, tokenId } }) => {
    const bgColor = useColorModeValue('none', 'gray.700');
    const borderColor = useColorModeValue('gray.200', 'gray.600');
    const { isOpen, onToggle } = useDisclosure()

    console.log(metadata, tokenId, name)

    return (
        <Box onMouseEnter={onToggle} onMouseLeave={onToggle} bgColor={bgColor} padding={2} borderRadius="xl" borderWidth="1px" borderColor={borderColor}>
            <Box position={'relative'} maxHeight="350" maxWidth={"350"} overflow={'hidden'} borderRadius="xl">
                <VStack>
                    <Image
                        src={resolveIPFS((metadata as { image?: string })?.image)}
                        alt={'nft'}
                        minH="350"
                        minW="350"
                        objectPosition={'center'}
                        objectFit="cover"
                        filter={isOpen ? 'brightness(0.3)' : 'brightness(1)'}
                    />
                    <Fade in={isOpen}>
                        <Link as={NextLink} href={`/projects/${tokenId}`}>
                            <Box mt="1" paddingRight={'3%'} position={'absolute'} top={'60%'} left={'2%'} fontWeight="semibold" as="h4" noOfLines={[1]} marginTop={2}>
                                <Text color={'white'} align={'left'} as='b'>{name}</Text>
                            </Box>
                            <Box mt="1" paddingRight={'3%'} position={'absolute'} textAlign={'center'} top={'70%'} left={'3%'}>
                                <Text color={'white'} fontSize='sm' as='samp' noOfLines={[1, 2, 3]}>{resolveIPFS((metadata as { description?: string })?.description)}</Text>
                            </Box>
                        </Link>
                        <Box mt="1" position={'absolute'} textAlign={'center'} top={'90%'} right={'3%'}>
                            <Text as='i' color={'white'} fontSize='md' noOfLines={1}>By Jay Oliva</Text>
                        </Box>
                    </Fade>
                    {tokenId}
                </VStack>
            </Box>
        </Box>
    );
};

export default ImageCard;
