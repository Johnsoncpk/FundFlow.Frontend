
import { Text, Image, useColorModeValue, HStack, Stat, StatArrow, StatGroup, StatHelpText, StatLabel, StatNumber, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr, VStack, Box } from '@chakra-ui/react';
import { EvmNft } from '@moralisweb3/common-evm-utils';
import { resolveIPFS } from 'utils/resolveIPFS';


const RankTable = (props: { title: string, caption?: string, nfts: EvmNft[] | undefined }) => {
  const hoverTrColor = useColorModeValue('gray.100', 'gray.700');

  return (
    <VStack>
      <TableContainer>
        <Text fontWeight={'bold'} my={"1"} fontSize='xl' align={'center'}>{props.title}</Text>
        <Table size={"sm"} variant='simple'>
          {
            props.caption && <TableCaption>{props.caption}</TableCaption>
          }
          <Thead>
            <Tr>
              <Th isNumeric>#</Th>
              <Th>Project</Th>
              <Th>Progress</Th>
            </Tr>
          </Thead>
          <Tbody>
            {props.nfts?.map((nft, key) => (
              <Tr key={`${nft?.symbol}-${key}-tr`} _hover={{ bgColor: hoverTrColor }} cursor="pointer">
                <Td>
                  {key + 1}
                </Td>
                <Td>
                  <HStack>
                    <Box maxW={"100px"} maxHeight="100px" overflow={'hidden'} borderRadius="xl">
                      <Image
                        src={resolveIPFS((nft.metadata as { image?: string })?.image)}
                        alt={'nft'}
                        minH="100px"
                        minW="100px"
                        objectFit="cover"
                      />
                    </Box>
                    <VStack alignItems={'flex-start'}>
                      <Text noOfLines={[1, 2]} as={'span'}>{nft?.name}</Text>
                      <Text fontSize={'xs'} as={'span'}>
                        {nft?.symbol}
                      </Text>
                    </VStack>
                  </HStack>
                </Td>
                <Td>
                  <StatGroup>
                    <Stat>
                      <StatLabel>Backed</StatLabel>
                      <StatNumber>345,670</StatNumber>
                      <StatHelpText p={'5px'}>
                        <StatArrow type='increase' />
                        23.36%
                      </StatHelpText>
                    </Stat>
                  </StatGroup></Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </VStack>
  );
};

export default RankTable;