import { Divider, HStack, Table, TableCaption, TableContainer, Tbody, Td, Text, Image, Th, Thead, Tr, VStack, useColorModeValue, Stat, StatArrow, StatGroup, StatHelpText, StatLabel, StatNumber, Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Heading } from '@chakra-ui/react';
import { Swiper } from 'components/modules/Swiper';
import { useEvmWalletNFTs } from '@moralisweb3/next';
import { useSession } from 'next-auth/react';
import { useNetwork } from 'wagmi';
import RankTable from './RankTable';

const Home = () => {
  const { data } = useSession();
  const { chain } = useNetwork();
  const { data: nfts } = useEvmWalletNFTs({
    address: data?.user?.address,
    chain: chain?.id,
  });

  return (
    <VStack>
      <Swiper nfts={nfts} />
      <Accordion defaultIndex={[0]}>
        <AccordionItem>
          <AccordionButton>
            <Box as="span" flex='1' textAlign='center'>
              <Heading>CHECK OUT WHAT IS NES AND HOT🔥</Heading>
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <HStack spacing={8}>
              <VStack >
                <RankTable title='Trending Projects📶' caption='Projects with weekly highest ❤️' nfts={nfts?.slice(5)} />
              </VStack>
              <Divider orientation='vertical' />
              <VStack>
                <RankTable title='Latest Project 🕒' caption='Latest Project 🕒' nfts={nfts?.slice(0, 5)} />
              </VStack>
            </HStack >
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex='1' textAlign='left'>
                <Heading>OR SEARCH THEM MANUALLY🔍</Heading>
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>

          </AccordionPanel>
        </AccordionItem>
      </Accordion>

    </VStack >
  );
};

export default Home;
