
import { Text, Image, useColorModeValue, HStack, Stat, StatArrow, StatGroup, StatHelpText, StatLabel, StatNumber, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr, VStack, Box } from '@chakra-ui/react';
import { EvmNft } from '@moralisweb3/common-evm-utils';
import { resolveIPFS } from 'utils/resolveIPFS';


const RankTable = (props: { title: string, caption?: string, nfts: EvmNft[] | undefined }) => {
  const hoverTrColor = useColorModeValue('gray.100', 'gray.700');

  return (
    <TableContainer>
      <Text fontWeight={'bold'} my={"1"} fontSize='xl' align={'center'}>{props.title}</Text>
      <Table variant='simple'>
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
                  <Box maxW={"120px"} maxHeight="120px" overflow={'hidden'} borderRadius="xl">
                    <Image
                      src={resolveIPFS((nft.metadata as { image?: string })?.image)}
                      alt={'nft'}
                      minH="120px"
                      minW="120px"
                      objectFit="cover"
                      boxSize="100%"
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
                    <StatLabel>Sent</StatLabel>
                    <StatNumber>345,670</StatNumber>
                    <StatHelpText>
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
  );
};

export default RankTable;