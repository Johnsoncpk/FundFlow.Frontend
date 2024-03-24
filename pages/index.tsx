import { Default } from 'components/layouts/Default';
import { Divider, HStack, VStack } from '@chakra-ui/react';
import { Swiper } from 'components/modules/Swiper';
import RankTable from 'components/templates/home/RankTable';
import Moralis from 'moralis';
import { EvmChain, EvmNft } from 'moralis/common-evm-utils';
import { CONTRACT_ADDRESS } from 'utils/getAddress';
import { GetServerSideProps, NextPage } from 'next';

type HomePageProps = {
  projects: EvmNft[]
}

const HomePage: NextPage<HomePageProps> = (props) => {

  return (
    <Default pageName="Home">
      <VStack>
        <Swiper nfts={props.projects} />
        <Divider />
        <HStack spacing={8}>
          <RankTable title='Trending in Design & Tech' caption='Projects with weekly highest like❤️' nfts={props.projects?.slice(5, 10)} />
          <Divider orientation='vertical' />
          <RankTable title='Trending in Video Games' caption='Projects with weekly highest like❤️' nfts={props.projects?.slice(0, 5)} />
        </HStack >
      </VStack >
    </Default>
  );
};

export default HomePage;

export const getServerSideProps:
  GetServerSideProps<HomePageProps> = async (_) => {

    if (!Moralis.Core.isStarted) {
      await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });
    }

    const projects = await Moralis.EvmApi.nft.getContractNFTs({
      address: CONTRACT_ADDRESS,
      chain: EvmChain.SEPOLIA,
      limit: 20,
    });

    const data = JSON.parse(JSON.stringify(projects.result));
    
    return {
      props: { projects: data },
    };

  }
